import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
    Environment,
    Float,
    OrbitControls,
    useTexture,
} from "@react-three/drei";
import * as THREE from "three";
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

function Badge({
    imageUrl,
    size = 5,
    depth = 0.08,
    rimColor = "#d4af37",
    backColor = "#1a1a1a",
    photoRoughness = 1.5,
    photoMetalness = 0.8,
    photoEnvMapIntensity = 1,
}: ShapedPinBadgeProps) {
    const texture = useTexture(imageUrl);
    texture.colorSpace = THREE.SRGBColorSpace;

    const { photoGeometry, rimGeometry, backGeometry } = useMemo(() => {
        const inner = shapeFromPoints(innerOutline);
        const outer = shapeFromPoints(outerOutline);
        outer.holes.push(shapeFromPoints(innerOutline));

        const photo = new THREE.ShapeGeometry(inner);
        applyPhotoUV(photo);
        photo.scale(size, size, 1);

        const rim = new THREE.ExtrudeGeometry(outer, {
            depth,
            bevelEnabled: true,
            bevelThickness: depth * 0.2,
            bevelSize: depth * 0.12,
            bevelSegments: 2,
            curveSegments: 24,
        });
        rim.scale(size, size, 1);
        rim.translate(0, 0, -depth);

        const back = new THREE.ShapeGeometry(outer);
        back.scale(size, size, 1);
        back.translate(0, 0, -depth);

        return { photoGeometry: photo, rimGeometry: rim, backGeometry: back };
    }, [size, depth]);

    return (
        <Float speed={2} rotationIntensity={0.35} floatIntensity={0.5}>
            <group>
                {/* Back plate */}
                <mesh geometry={backGeometry}>
                    <meshStandardMaterial
                        color={backColor}
                        metalness={0.5}
                        roughness={0.6}
                        side={THREE.BackSide}
                    />
                </mesh>

                {/* Gold rim (die-cut border, extruded) */}
                <mesh geometry={rimGeometry} castShadow receiveShadow>
                    <meshStandardMaterial
                        color={rimColor}
                        metalness={1}
                        roughness={0.25}
                    />
                </mesh>

                {/* Photo face, flush with the front of the rim */}
                <mesh geometry={photoGeometry} position={[0, 0, 0.005]}>
                    <meshStandardMaterial
                        map={texture}
                        roughness={photoRoughness}
                        metalness={photoMetalness}
                        envMapIntensity={photoEnvMapIntensity}
                    />
                </mesh>
            </group>
        </Float>
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
