import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
export default function HeroLight() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <spotLight position={[2, 5, 6]} intensity={100} />
            <Environment preset="night" background={false} />

            <EffectComposer>
                <Bloom
                    intensity={4}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.2}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    );
}
