import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function Spring({ position, rotation, scale = 1 }: any) {
    const ref = useRef<THREE.Mesh>(null!);

    useFrame((_state, delta) => {
        ref.current.rotation.z += delta * 0.5;
    });

    return (
        <Float rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
                <torusKnotGeometry args={[0.5, 0.1, 64, 8, 2, 3]} />
                <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
            </mesh>
        </Float>
    );
}

export function Gear({ position, rotation, scale = 1, color = "#D33F49" }: any) {
    const ref = useRef<THREE.Group>(null!);

    useFrame((_state, delta) => {
        ref.current.rotation.z -= delta * 0.5;
    });

    return (
        <Float rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={ref} position={position} rotation={rotation} scale={scale}>
                {/* Main Ring */}
                <mesh>
                    <torusGeometry args={[1, 0.3, 16, 32]} />
                    <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
                </mesh>
                {/* Teeth (simplified as boxes) */}
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 1.2, Math.sin(i * Math.PI / 4) * 1.2, 0]} rotation={[0, 0, i * Math.PI / 4]}>
                        <boxGeometry args={[0.4, 0.4, 0.4]} />
                        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}
