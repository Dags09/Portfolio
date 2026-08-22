import { useGLTF, Environment, Float, OrbitControls } from "@react-three/drei";
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

    // useEffect(() =>{
    //     if(model.name === 'Interactive Developer'){
    //         scene.scene.traverse((child) =>{
    //             if(child.isMesh = new ThreeMFLoader.MeshStandardMaterial({ color:'white'}))
    //         })
    //     }
    // },[scene])

    return (
        <Canvas>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Environment preset="city" />

            <OrbitControls enableZoom={false} />

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
