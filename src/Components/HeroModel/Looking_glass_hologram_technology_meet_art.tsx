import * as THREE from "three";
import React from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        Concept_203_hexagon__0: THREE.Mesh;
        Concept_203_glowing_edges_0: THREE.Mesh;
        Concept_2_orange_line01_thin_line_0: THREE.Mesh;
        Concept_201_blue_cube_mapped_0: THREE.Mesh;
        Plane002_volume_light_0: THREE.Mesh;
        Concept_204_blue_cube_mapped_0: THREE.Mesh;
        Plane004_volume_light_0: THREE.Mesh;
        Plane005_volume_light_0: THREE.Mesh;
        Plane006_volume_light_0: THREE.Mesh;
        Plane007_volume_light_0: THREE.Mesh;
        Plane008_volume_light_0: THREE.Mesh;
    };
    materials: {
        hexagon: THREE.MeshStandardMaterial;
        glowing_edges: THREE.MeshStandardMaterial;
        thin_line: THREE.MeshStandardMaterial;
        blue_cube_mapped: THREE.MeshStandardMaterial;
        volume_light: THREE.MeshStandardMaterial;
    };
};

export function Model(props: ThreeElements["group"]) {
    const group = React.useRef<THREE.Group>(null);
    const { nodes, materials, animations } = useGLTF(
        "/models/looking_glass_hologram_technology_meet_art.glb",
    ) as unknown as GLTFResult;
    const { actions } = useAnimations(animations, group);

    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        actions["Take 001"]?.reset().play();
        // trigger the intro animation once mounted
        const t = setTimeout(() => setReady(true), 50);
        return () => {
            actions["Take 001"]?.stop();
            clearTimeout(t);
        };
    }, [actions]);

    React.useEffect(() => {
        Object.values(materials).forEach((mat) => {
            mat.toneMapped = false;
        });
        if (materials.volume_light) {
            materials.volume_light.blending = THREE.AdditiveBlending;
            materials.volume_light.depthWrite = false;
            materials.volume_light.transparent = true;
            materials.volume_light.opacity = 0.08;
        }
    }, [materials]);

    useFrame((_, delta) => {
        if (group.current) {
            const target = ready ? 1 : 0;
            const s = THREE.MathUtils.lerp(
                group.current.scale.x,
                target,
                1.5 * delta,
            );
            group.current.scale.setScalar(s);
        }
    });

    return (
        <group ref={group} {...props} scale={0} dispose={null}>
            <group name="Sketchfab_Scene">
                <group
                    name="Sketchfab_model"
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.84}
                >
                    <group
                        name="d4e286c425e847e78723a56ea435af67fbx"
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        <group name="Object_2">
                            <group name="RootNode">
                                <group
                                    name="Concept_202"
                                    position={[0, 0.152, 0]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={0.001}
                                >
                                    <group
                                        name="Concept_203"
                                        rotation={[0, Math.PI / 2, 0]}
                                    >
                                        <group
                                            name="Object_6"
                                            position={[-0.036, 0.072, -507.334]}
                                        >
                                            <mesh
                                                name="Concept_203_hexagon__0"
                                                geometry={
                                                    nodes.Concept_203_hexagon__0
                                                        .geometry
                                                }
                                                material={materials.hexagon}
                                            />
                                            <mesh
                                                name="Concept_203_glowing_edges_0"
                                                geometry={
                                                    nodes
                                                        .Concept_203_glowing_edges_0
                                                        .geometry
                                                }
                                                material={
                                                    materials.glowing_edges
                                                }
                                            />
                                        </group>
                                    </group>
                                    <group
                                        name="Concept_2_orange_line01"
                                        position={[7.689, 0, 0]}
                                        rotation={[0.087, 1.571, 0]}
                                    >
                                        <group
                                            name="Object_10"
                                            position={[-0.036, 0.072, -507.334]}
                                        >
                                            <mesh
                                                name="Concept_2_orange_line01_thin_line_0"
                                                geometry={
                                                    nodes
                                                        .Concept_2_orange_line01_thin_line_0
                                                        .geometry
                                                }
                                                material={materials.thin_line}
                                            />
                                        </group>
                                    </group>
                                </group>
                                <group
                                    name="Concept_201"
                                    position={[0, 0.152, 0]}
                                    rotation={[0.698, 0, -Math.PI / 4]}
                                    scale={0.005}
                                >
                                    <group
                                        name="Object_13"
                                        position={[0, 0, -12.5]}
                                    >
                                        <mesh
                                            name="Concept_201_blue_cube_mapped_0"
                                            geometry={
                                                nodes
                                                    .Concept_201_blue_cube_mapped_0
                                                    .geometry
                                            }
                                            material={
                                                materials.blue_cube_mapped
                                            }
                                        />
                                    </group>
                                </group>
                                <group
                                    name="Plane002"
                                    position={[-0.819, 0.167, -0.003]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={0.001}
                                >
                                    <group
                                        name="Object_16"
                                        position={[532.114, 0, -38.875]}
                                        rotation={[Math.PI / 2, 0, 1.52]}
                                    >
                                        <mesh
                                            name="Plane002_volume_light_0"
                                            geometry={
                                                nodes.Plane002_volume_light_0
                                                    .geometry
                                            }
                                            material={materials.volume_light}
                                        />
                                    </group>
                                </group>
                                <group
                                    name="Concept_204"
                                    position={[0, 0.152, 0]}
                                    rotation={[0.698, 0, -Math.PI / 4]}
                                    scale={0.006}
                                >
                                    <group
                                        name="Object_19"
                                        position={[0, 0, -12.5]}
                                    >
                                        <mesh
                                            name="Concept_204_blue_cube_mapped_0"
                                            geometry={
                                                nodes
                                                    .Concept_204_blue_cube_mapped_0
                                                    .geometry
                                            }
                                            material={
                                                materials.blue_cube_mapped
                                            }
                                        />
                                    </group>
                                </group>
                                <group
                                    name="Plane004"
                                    position={[-0.819, 0.168, -0.003]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={0.001}
                                >
                                    <group
                                        name="Object_22"
                                        position={[532.598, -21.397, 16.451]}
                                        rotation={[1.572, -0.04, 1.602]}
                                    >
                                        <mesh
                                            name="Plane004_volume_light_0"
                                            geometry={
                                                nodes.Plane004_volume_light_0
                                                    .geometry
                                            }
                                            material={materials.volume_light}
                                        />
                                    </group>
                                </group>
                                <group
                                    name="Plane005"
                                    position={[0.879, 0.143, -0.003]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={0.001}
                                >
                                    <group
                                        name="Object_25"
                                        position={[-533.066, 14.955, -16.481]}
                                        rotation={[-1.57, 0.028, -1.58]}
                                    >
                                        <mesh
                                            name="Plane005_volume_light_0"
                                            geometry={
                                                nodes.Plane005_volume_light_0
                                                    .geometry
                                            }
                                            material={materials.volume_light}
                                        />
                                    </group>
                                </group>
                                <group
                                    name="Plane006"
                                    position={[0.879, 0.143, -0.003]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={0.001}
                                >
                                    <group
                                        name="Object_28"
                                        position={[-532.464, 0, 29.508]}
                                        rotation={[-Math.PI / 2, 0, -1.515]}
                                    >
                                        <mesh
                                            name="Plane006_volume_light_0"
                                            geometry={
                                                nodes.Plane006_volume_light_0
                                                    .geometry
                                            }
                                            material={materials.volume_light}
                                        />
                                    </group>
                                </group>
                                <group
                                    name="Plane007"
                                    position={[-0.819, 0.167, -0.01]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={0.001}
                                >
                                    <group
                                        name="Object_31"
                                        position={[530.292, 29.795, -50.588]}
                                        rotation={[1.572, 0.056, 1.498]}
                                    >
                                        <mesh
                                            name="Plane007_volume_light_0"
                                            geometry={
                                                nodes.Plane007_volume_light_0
                                                    .geometry
                                            }
                                            material={materials.volume_light}
                                        />
                                    </group>
                                </group>
                                <group
                                    name="Plane008"
                                    position={[0.879, 0.142, -0.01]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={0.001}
                                >
                                    <group
                                        name="Object_34"
                                        position={[-530.292, 29.795, -50.588]}
                                        rotation={[1.572, -0.056, -1.498]}
                                        scale={[-1, 1, 1]}
                                    >
                                        <mesh
                                            name="Plane008_volume_light_0"
                                            geometry={
                                                nodes.Plane008_volume_light_0
                                                    .geometry
                                            }
                                            material={materials.volume_light}
                                        />
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/models/looking_glass_hologram_technology_meet_art.glb");
