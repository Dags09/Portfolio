import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface ParticleFieldProps {
    isMobile?: boolean;
}

export default function ParticleField({
    isMobile = false,
}: ParticleFieldProps) {
    const [showBlue, setShowBlue] = useState(false);
    const [showPink, setShowPink] = useState(false);
    const [showWhite, setShowWhite] = useState(false);

    const blueRef = useRef<THREE.Group>(null);
    const pinkRef = useRef<THREE.Group>(null);
    const whiteRef = useRef<THREE.Group>(null);
    useEffect(() => {
        const t1 = setTimeout(() => setShowBlue(true), 800);
        const t2 = setTimeout(() => setShowPink(true), 1300);
        const t3 = setTimeout(() => setShowWhite(true), 1600);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    useFrame((_, delta) => {
        const lerpSpeed = 1.5 * delta;

        if (blueRef.current) {
            const target = showBlue ? 1 : 0;
            blueRef.current.scale.setScalar(
                THREE.MathUtils.lerp(
                    blueRef.current.scale.x,
                    target,
                    lerpSpeed,
                ),
            );
        }
        if (pinkRef.current) {
            const target = showPink ? 1 : 0;
            pinkRef.current.scale.setScalar(
                THREE.MathUtils.lerp(
                    pinkRef.current.scale.x,
                    target,
                    lerpSpeed,
                ),
            );
        }
        if (whiteRef.current) {
            const target = showWhite ? 1 : 0;
            whiteRef.current.scale.setScalar(
                THREE.MathUtils.lerp(
                    whiteRef.current.scale.x,
                    target,
                    lerpSpeed,
                ),
            );
        }
    });

    return (
        <group>
            {/* Fine blue dust — dense, small, fast twinkle */}
            <group ref={blueRef} scale={0}>
                {showBlue && (
                    <Sparkles
                        count={isMobile ? 80 : 250}
                        scale={[22, 10, 22]}
                        size={2.5}
                        speed={0.4}
                        opacity={0.7}
                        color="#4da6ff"
                        noise={0}
                    />
                )}
            </group>

            {/* Pink accents — sparser, bigger, slower twinkle */}
            <group ref={pinkRef} scale={0}>
                {showPink && (
                    <Sparkles
                        count={isMobile ? 30 : 80}
                        scale={[20, 9, 20]}
                        size={5}
                        speed={0.15}
                        opacity={0.6}
                        color="#ff4da6"
                        noise={0}
                    />
                )}
            </group>

            {/* Soft white highlights — sparse, largest, gentle twinkle */}
            <group ref={whiteRef} scale={0}>
                {showWhite && (
                    <Sparkles
                        count={isMobile ? 15 : 30}
                        scale={[18, 8, 18]}
                        size={7}
                        speed={0.08}
                        opacity={0.9}
                        color="#e6f2ff"
                        noise={0}
                    />
                )}
            </group>
        </group>
    );
}
