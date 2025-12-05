import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TheMonolith({ scale = 1, position = [0, 0, 0] }: { scale?: number, position?: [number, number, number] }) {
    const group = useRef<THREE.Group>(null!);

    useFrame((state) => {
        // Subtle floating motion
        group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Main Monolith Body - Concrete/Brutalist */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 6, 2]} />
                <meshStandardMaterial 
                    color="#4A4A4A" 
                    roughness={0.9} 
                    metalness={0.1}
                />
            </mesh>

            {/* Glowing "Data" Veins */}
            <mesh position={[0, 0, 1.01]}>
                <planeGeometry args={[0.2, 5]} />
                <meshBasicMaterial color="#E0CA3C" />
            </mesh>
            <mesh position={[0.5, 1, 1.01]}>
                <planeGeometry args={[0.1, 2]} />
                <meshBasicMaterial color="#E0CA3C" />
            </mesh>
             <mesh position={[-0.5, -1, 1.01]}>
                <planeGeometry args={[0.1, 3]} />
                <meshBasicMaterial color="#E0CA3C" />
            </mesh>

            {/* Base Platform */}
            <mesh position={[0, -3.5, 0]}>
                <cylinderGeometry args={[2, 2.5, 1, 6]} />
                <meshStandardMaterial color="#2C2C2C" />
            </mesh>
        </group>
    );
}
