import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TheGlassVault({ scale = 1, position = [0, 0, 0] }: { scale?: number, position?: [number, number, number] }) {
    const group = useRef<THREE.Group>(null!);
    const innerCube = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        group.current.rotation.y = state.clock.elapsedTime * 0.1;
        innerCube.current.rotation.x = state.clock.elapsedTime * 0.5;
        innerCube.current.rotation.z = state.clock.elapsedTime * 0.5;
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Outer Glass Shell */}
            <mesh>
                <boxGeometry args={[2.5, 2.5, 2.5]} />
                <meshStandardMaterial
                    color="#A0E8AF"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Inner "Tax" Core - Protected Value */}
            <mesh ref={innerCube}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color="#008F95"
                    emissive="#008F95"
                    emissiveIntensity={0.8}
                    wireframe
                />
            </mesh>

            {/* Solid Base */}
            <mesh position={[0, -1.3, 0]}>
                <boxGeometry args={[3, 0.1, 3]} />
                <meshStandardMaterial color="#2C2C2C" />
            </mesh>
        </group>
    );
}
