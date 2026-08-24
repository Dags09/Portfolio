import { useGLTF, Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export interface TechModel {
    name: string;
    modelPath: string;
    scale?: number | [number, number, number];
    position?: [number, number, number];
    rotation?: [number, number, number];
}

interface TechIconProps {
    model: TechModel;
}

export default function TechIcon({ model }: TechIconProps) {
    const scene = useGLTF(model.modelPath);

    return (
        <Canvas dpr={[1, 1.5]} frameloop="always">
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, -3, -5]} intensity={0.4} />

            <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
                <group
                    scale={model.scale}
                    rotation={model.rotation}
                    position={model.position}
                >
                    <primitive object={scene.scene} />
                </group>
            </Float>
        </Canvas>
    );
}
