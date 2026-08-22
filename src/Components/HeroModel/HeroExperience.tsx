import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Model } from "./Looking_glass_hologram_technology_meet_art";
import HeroLight from "./HeroLights";
import ParticleField from "./ParticleField";

export default function HeroExperience() {
    const isTablet = useMediaQuery("(max-width: 1024px)");
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <Canvas
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            camera={{ position: [0, 0, 15], fov: 45 }}
            gl={{
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.6,
            }}
        >
            <OrbitControls
                enablePan={false}
                enableZoom={!isTablet && !isMobile}
                maxDistance={30}
                minDistance={10}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 1}
            />

            <HeroLight />

            <Suspense fallback={null}>
                <group
                    scale={isMobile ? 8 : 10}
                    position={
                        isMobile
                            ? [0, -3.2, 0]
                            : isTablet
                              ? [0, -4.2, 0]
                              : [0, -1.5, 0]
                    }
                    rotation={[0, Math.PI / 12, 0]}
                >
                    <Model />
                </group>
                <group
                    position={
                        isMobile
                            ? [0, -2.5, 0]
                            : isTablet
                              ? [0, -3.4, 0]
                              : [0, 0, 0]
                    }
                >
                    <ParticleField isMobile={isMobile} />
                </group>
            </Suspense>
        </Canvas>
    );
}
