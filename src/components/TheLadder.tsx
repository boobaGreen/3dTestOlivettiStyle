import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TheLadder({ scale = 1, position = [0, 0, 0] }: { scale?: number, position?: [number, number, number] }) {
    const group = useRef<THREE.Group>(null!);

    useFrame((state) => {
        // Gentle floating
        group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Steps - Rising Upwards */}
            {Array.from({ length: 5 }).map((_, i) => (
                <mesh key={i} position={[i * 0.5, i * 0.8, 0]}>
                    <boxGeometry args={[1.5, 0.2, 1]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? "#D33F49" : "#2C2C2C"} // Alternating Red/Grey
                        roughness={0.5}
                    />
                </mesh>
            ))}

            {/* Side Rails - Abstract Lines */}
            <mesh position={[1, 2, -0.6]} rotation={[0, 0, 0.5]}>
                <cylinderGeometry args={[0.05, 0.05, 6]} />
                <meshStandardMaterial color="#E0CA3C" metalness={0.8} />
            </mesh>
            <mesh position={[1, 2, 0.6]} rotation={[0, 0, 0.5]}>
                <cylinderGeometry args={[0.05, 0.05, 6]} />
                <meshStandardMaterial color="#E0CA3C" metalness={0.8} />
            </mesh>

            {/* Platform at Top - The Goal */}
            <mesh position={[2.5, 4.2, 0]}>
                <cylinderGeometry args={[1, 1, 0.2, 6]} />
                <meshStandardMaterial color="#008F95" emissive="#008F95" emissiveIntensity={0.2} />
            </mesh>
        </group>
    );
}
