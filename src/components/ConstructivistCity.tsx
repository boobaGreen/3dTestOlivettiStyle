import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Tree({ position, color }: { position: [number, number, number], color: string }) {
    return (
        <group position={position}>
            {/* Trunk */}
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
                <meshStandardMaterial color="#5D4037" />
            </mesh>
            {/* Foliage (Lollipop) */}
            <mesh position={[0, 2.5, 0]}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
        </group>
    );
}

export function ConstructivistCity({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number], scale?: number }) {
    const group = useRef<THREE.Group>(null!);

    useFrame((state) => {
        // Subtle rotation
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* The Factory (ICO Style) */}
            <group position={[0, 0, -2]}>
                {/* Glass Facade - Premium Material */}
                <mesh position={[0, 4, 0]}>
                    <boxGeometry args={[12, 8, 0.5]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        thickness={0.5}
                        chromaticAberration={0.05}
                        anisotropy={0.1}
                        distortion={0.1}
                        distortionScale={0.1}
                        temporalDistortion={0.1}
                        color="#81D4FA"
                        resolution={512}
                    />
                </mesh>

                {/* Concrete Pillars */}
                <Instances range={4}>
                    <cylinderGeometry args={[0.3, 0.3, 8, 32]} />
                    <meshStandardMaterial color="#E0E0E0" roughness={0.9} />
                    <Instance position={[-5, 4, 0]} />
                    <Instance position={[-2, 4, 0]} />
                    <Instance position={[2, 4, 0]} />
                    <Instance position={[5, 4, 0]} />
                </Instances>

                {/* Floors */}
                <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[14, 6]} />
                    <meshStandardMaterial color="#F5F5F5" />
                </mesh>
            </group>

            {/* The Park (Community) */}
            <group position={[0, 0, 2]}>
                <Tree position={[-4, 0, 0]} color="#008F95" />
                <Tree position={[-2, 0, 1]} color="#D33F49" />
                <Tree position={[3, 0, -1]} color="#E0CA3C" />
                <Tree position={[5, 0, 1]} color="#008F95" />
            </group>

            {/* Tiny Houses/People */}
            <Instances range={10}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#D33F49" />
                {Array.from({ length: 10 }).map((_, i) => (
                    <Instance
                        key={i}
                        position={[
                            (Math.random() - 0.5) * 10,
                            0.25,
                            (Math.random() - 0.5) * 4 + 3
                        ]}
                    />
                ))}
            </Instances>
        </group>
    );
}
