import { useGLTF, Environment, Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { ComponentType } from "react";
import type { ThreeElements } from "@react-three/fiber";

export interface TechModel {
    name: string;
    modelPath: string;
    modelComponent?: ComponentType<ThreeElements["group"]>;
    scale?: number | [number, number, number];
    position?: [number, number, number];
    rotation?: [number, number, number];
}

interface TechIconProps {
    model: TechModel;
}

function TechModelScene({ model }: TechIconProps) {
    const scene = useGLTF(model.modelPath);

    return (
        <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
            <group
                scale={model.scale}
                rotation={model.rotation}
                position={model.position}
            >
                <primitive object={scene.scene} />
            </group>
        </Float>
    );
}

function GeneratedTechModel({ model }: TechIconProps) {
    const Model = model.modelComponent;
    if (!Model) return null;

    return (
        <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
            <Model
                scale={model.scale}
                rotation={model.rotation}
                position={model.position}
            />
        </Float>
    );
}

export default function TechIcon({ model }: TechIconProps) {
    return (
        <Canvas>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Environment preset="city" />

            <OrbitControls enableZoom={false} />

            <Suspense fallback={null}>
                {model.modelComponent ? (
                    <GeneratedTechModel model={model} />
                ) : (
                    <TechModelScene model={model} />
                )}
            </Suspense>
        </Canvas>
    );
}
