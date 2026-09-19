import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { innerOutline, outerOutline } from "./badgeShapeData";

interface ShapedPinBadgeProps {
    /** Path to the transparent PNG of your photo, e.g. "/images/pin-photo.png" */
    imageUrl: string;
    /** Overall size (width) of the badge in scene units. Bigger = badge fills more of the canvas. */
    size?: number;
    /** Thickness/depth of the gold rim */
    depth?: number;
    /** Rim + backplate metal color */
    rimColor?: string;
    backColor?: string;
    /** Camera distance from the badge — smaller = more zoomed in */
    cameraDistance?: number;
    /** Camera field of view in degrees — smaller = more zoomed in, less distortion */
    fov?: number;
    /** How rough the photo surface is (0 = mirror-sharp highlight, 1 = fully matte/no shine) */
    photoRoughness?: number;
    /** How metallic the photo surface behaves (0 = normal photo/paper, 1 = metallic sheen) */
    photoMetalness?: number;
    /** How strongly the photo reflects the studio environment (0 = none, 1 = full strength) */
    photoEnvMapIntensity?: number;
    /** Play the "metal pieces assemble" intro animation on mount */
    assemble?: boolean;
    /** How many separate metal fragments the rim is broken into for the intro */
    assemblePieceCount?: number;
    /** Seconds it takes a single piece to fly into place */
    assemblePieceDuration?: number;
    /** Seconds between one piece starting and the next starting (controls the "piece by piece" pacing) */
    assembleStagger?: number;
    /** Gently bob/tilt the whole badge once the intro has finished */
    float?: boolean;
    /** How far the badge drifts up/down while floating (in scene units) */
    floatAmplitude?: number;
    /** How fast the float cycle runs — higher is faster */
    floatSpeed?: number;
    /** How far the badge tilts (radians) while floating */
    floatTilt?: number;
}

/** Builds a smooth THREE.Shape from a dense, pre-smoothed outline of [x, y] points. */
function shapeFromPoints(points: [number, number][]): THREE.Shape {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return shape;
}

/**
 * Sets a custom UV attribute on a flat ShapeGeometry so that a texture
 * mapped onto it lines up with the *original photo* pixel-for-pixel
 * (rather than three.js's default bounding-box UVs).
 * Relies on inner/outer points already being normalized so that
 * u = x + 0.5, v = y + 0.5 matches the source image exactly.
 */
function applyPhotoUV(geometry: THREE.BufferGeometry) {
    const pos = geometry.attributes.position;
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
        uv[i * 2] = pos.getX(i) + 0.5;
        uv[i * 2 + 1] = pos.getY(i) + 0.5;
    }
    geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

/**
 * Picks up to `maxPoints` evenly-spaced points from a dense outline.
 * The intro fragments are thin, fast-moving slivers, so they don't need
 * the full pixel-accurate point density the flat photo/back geometry does —
 * this keeps ExtrudeGeometry construction cheap on first mount.
 */
function decimate(
    points: [number, number][],
    maxPoints: number,
): [number, number][] {
    if (points.length <= maxPoints) return points;
    const result: [number, number][] = [];
    for (let i = 0; i < maxPoints; i++) {
        result.push(
            points[Math.floor((i / (maxPoints - 1)) * (points.length - 1))],
        );
    }
    return result;
}

/**
 * Slices a closed outline into `segments` contiguous arcs, walking the
 * points in their existing order. A 1-point overlap between neighboring
 * chunks keeps the fragments seamless once they're back in place.
 */
function splitOutline(
    points: [number, number][],
    segments: number,
): [number, number][][] {
    const len = points.length;
    const chunks: [number, number][][] = [];
    for (let s = 0; s < segments; s++) {
        const start = Math.floor((s / segments) * len);
        const end = Math.floor(((s + 1) / segments) * len);
        const chunk = points.slice(start, Math.min(end + 1, len));
        if (chunk.length >= 2) chunks.push(chunk);
    }
    return chunks;
}

/**
 * Builds one wedge-shaped fragment of the rim: walk along the inner arc,
 * then back along the matching outer arc, closing the loop. Because the
 * inner/outer outlines trace the same silhouette (just offset outward),
 * corresponding fractional slices line up as a clean sliver of the rim.
 */
function buildWedgeShape(
    innerSeg: [number, number][],
    outerSeg: [number, number][],
): THREE.Shape {
    const shape = new THREE.Shape();
    shape.moveTo(innerSeg[0][0], innerSeg[0][1]);
    for (let i = 1; i < innerSeg.length; i++) {
        shape.lineTo(innerSeg[i][0], innerSeg[i][1]);
    }
    for (let i = outerSeg.length - 1; i >= 0; i--) {
        shape.lineTo(outerSeg[i][0], outerSeg[i][1]);
    }
    shape.closePath();
    return shape;
}

function centroidOf(points: [number, number][]): [number, number] {
    let x = 0;
    let y = 0;
    for (const [px, py] of points) {
        x += px;
        y += py;
    }
    return [x / points.length, y / points.length];
}

interface RimPiece {
    geometry: THREE.ExtrudeGeometry;
    /** Outward direction (from badge center through this piece's centroid), normalized */
    direction: [number, number];
}

function Badge({
    imageUrl,
    size = 5,
    depth = 0.05,
    rimColor = "#d4af37",
    backColor = "#1a1a1a",
    photoRoughness = 1.5,
    photoMetalness = 0.8,
    photoEnvMapIntensity = 1,
    assemble = true,
    assemblePieceCount = 13,
    assemblePieceDuration = 1.1,
    assembleStagger = 0.05,
    float = true,
    floatAmplitude = size * 0.05,
    floatSpeed = 0.8,
    floatTilt = 0.05,
}: ShapedPinBadgeProps) {
    const texture = useTexture(imageUrl);
    texture.colorSpace = THREE.SRGBColorSpace;

    const { photoGeometry, backGeometry, rimPieces } = useMemo(() => {
        const inner = shapeFromPoints(innerOutline);

        const photo = new THREE.ShapeGeometry(inner);
        applyPhotoUV(photo);
        photo.scale(size, size, 1);

        const outerForBack = shapeFromPoints(outerOutline);
        outerForBack.holes.push(shapeFromPoints(innerOutline));
        const back = new THREE.ShapeGeometry(outerForBack);
        back.scale(size, size, 1);
        back.translate(0, 0, -depth);

        // The gold rim is cut into fragments so it can fly together on mount.
        // Decimated to a much lower point budget than the raw outline —
        // these are thin, fast-moving slivers, so full pixel-accuracy is
        // wasted work that shows up as jank on first mount.
        const decimatedInner = decimate(innerOutline, 160);
        const decimatedOuter = decimate(outerOutline, 160);
        const innerChunks = splitOutline(decimatedInner, assemblePieceCount);
        const outerChunks = splitOutline(decimatedOuter, assemblePieceCount);
        const pieceCount = Math.min(innerChunks.length, outerChunks.length);

        const pieces: RimPiece[] = [];
        for (let i = 0; i < pieceCount; i++) {
            const innerSeg = innerChunks[i];
            const outerSeg = outerChunks[i];
            const wedge = buildWedgeShape(innerSeg, outerSeg);

            const geometry = new THREE.ExtrudeGeometry(wedge, {
                depth,
                bevelEnabled: true,
                bevelThickness: depth * 0.15,
                bevelSize: depth * 0.15,
                bevelSegments: 1,
                curveSegments: 1,
            });
            geometry.scale(size, size, 1);
            geometry.translate(0, 0, -depth);

            const [cx, cy] = centroidOf([...innerSeg, ...outerSeg]);
            const len = Math.hypot(cx, cy) || 1;
            pieces.push({ geometry, direction: [cx / len, cy / len] });
        }

        return { photoGeometry: photo, backGeometry: back, rimPieces: pieces };
    }, [size, depth, assemblePieceCount]);

    const pieceRefs = useRef<(THREE.Mesh | null)[]>([]);
    const pieceMaterialRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
    const floatGroupRef = useRef<THREE.Group>(null);
    const settledRef = useRef(!assemble);
    const floatStartRef = useRef<number | null>(null);

    useGSAP(
        () => {
            if (!assemble) return;
            settledRef.current = false;
            floatStartRef.current = null;

            const flyDistance = size * 1.6;
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Randomize which fragment flies in at which position in the
            // sequence, so the rim doesn't visibly build up in shape order.
            const order = rimPieces.map((_, i) => i);
            for (let i = order.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [order[i], order[j]] = [order[j], order[i]];
            }

            order.forEach((pieceIndex, orderPos) => {
                const piece = rimPieces[pieceIndex];
                const mesh = pieceRefs.current[pieceIndex];
                const material = pieceMaterialRefs.current[pieceIndex];
                if (!mesh || !material) return;

                const [dx, dy] = piece.direction;
                const startTime = orderPos * assembleStagger;

                gsap.set(mesh.position, {
                    x: dx * flyDistance,
                    y: dy * flyDistance,
                    z: (Math.random() - 0.5) * size * 1.2,
                });
                gsap.set(mesh.rotation, {
                    x: (Math.random() - 0.5) * Math.PI,
                    y: (Math.random() - 0.5) * Math.PI,
                    z: (Math.random() - 0.5) * Math.PI,
                });
                gsap.set(material, { opacity: 0 });

                tl.to(
                    mesh.position,
                    { x: 0, y: 0, z: 0, duration: assemblePieceDuration },
                    startTime,
                )
                    .to(
                        mesh.rotation,
                        { x: 0, y: 0, z: 0, duration: assemblePieceDuration },
                        startTime,
                    )
                    .to(
                        material,
                        { opacity: 1, duration: assemblePieceDuration * 0.6 },
                        startTime,
                    );
            });

            // Floating only kicks in once every fragment has clicked into place.
            tl.eventCallback("onComplete", () => {
                settledRef.current = true;
            });
        },
        { dependencies: [rimPieces, assemble] },
    );

    useFrame(({ clock }) => {
        const group = floatGroupRef.current;
        if (!group || !float || !settledRef.current) return;
        if (floatStartRef.current === null) {
            floatStartRef.current = clock.elapsedTime;
        }
        const t = clock.elapsedTime - floatStartRef.current;
        group.position.y = Math.sin(t * floatSpeed) * floatAmplitude;
        group.rotation.z = Math.sin(t * floatSpeed * 0.5) * floatTilt;
        group.rotation.x = Math.cos(t * floatSpeed * 0.4) * floatTilt * 0.5;
    });

    return (
        <group ref={floatGroupRef}>
            {/* Back plate */}
            <mesh geometry={backGeometry}>
                <meshStandardMaterial
                    color={backColor}
                    metalness={0.5}
                    roughness={0.6}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Gold rim, cut into fragments that assemble on mount */}
            {rimPieces.map((piece, i) => (
                <mesh
                    key={i}
                    ref={(el) => {
                        pieceRefs.current[i] = el;
                    }}
                    geometry={piece.geometry}
                    receiveShadow
                >
                    <meshStandardMaterial
                        ref={(el) => {
                            pieceMaterialRefs.current[i] = el;
                        }}
                        color={rimColor}
                        metalness={1}
                        roughness={0.25}
                        transparent
                        opacity={1}
                    />
                </mesh>
            ))}

            {/* Photo face, flush with the front of the rim — visible immediately */}
            <mesh geometry={photoGeometry} position={[0, 0, 0.005]}>
                <meshStandardMaterial
                    map={texture}
                    roughness={photoRoughness}
                    metalness={photoMetalness}
                    envMapIntensity={photoEnvMapIntensity}
                />
            </mesh>
        </group>
    );
}

export default function ShapedPinBadge({
    cameraDistance = 6,
    fov = 40,
    ...badgeProps
}: ShapedPinBadgeProps) {
    return (
        <Canvas camera={{ position: [0, 0, cameraDistance], fov }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
            <Environment preset="studio" />

            <Suspense fallback={null}>
                <Badge {...badgeProps} />
            </Suspense>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minAzimuthAngle={-Math.PI / 4} // how far left
                maxAzimuthAngle={Math.PI / 4} // how far right
                minPolarAngle={Math.PI / 2 - Math.PI / 6} // how far up
                maxPolarAngle={Math.PI / 2 + Math.PI / 6} // how far down
            />
        </Canvas>
    );
}
