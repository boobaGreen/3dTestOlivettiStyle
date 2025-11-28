import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { TypewriterKey } from './TypewriterKey';

export function ConstructivistTypewriter({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number], scale?: number }) {
    const group = useRef<THREE.Group>(null!);
    const carriage = useRef<THREE.Group>(null!);

    useFrame((state) => {
        // Animate Carriage moving left/right
        const t = state.clock.elapsedTime;
        carriage.current.position.x = Math.sin(t) * 1.5;

        // Gentle float of entire machine
        group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
        group.current.rotation.y = Math.sin(t * 0.2) * 0.05; // Reduced rotation
    });

    // Generate keyboard grid
    const keys = [];
    const rows = 4;
    const cols = 10;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            keys.push({
                id: `key-${r}-${c}`,
                char: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
                x: (c - cols / 2) * 0.6,
                z: (r - rows / 2) * 0.6 + 2,
                y: Math.random() * 0.1,
                delay: Math.random() * 2 // For wave animation
            });
        }
    }

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Chassis (The Body) - Bakelite Material */}
            <RoundedBox args={[8, 2, 6]} radius={0.5} smoothness={4} position={[0, 0, 0]}>
                <meshPhysicalMaterial
                    color="#008F95"
                    roughness={0.2}
                    metalness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </RoundedBox>

            {/* The Carriage (The Roller) */}
            <group ref={carriage} position={[0, 1.5, -1]}>
                {/* Roller */}
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.8, 0.8, 10, 32]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
                </mesh>

                {/* Knob Left */}
                <mesh position={[-5.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[1, 1, 0.5, 32]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Knob Right */}
                <mesh position={[5.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[1, 1, 0.5, 32]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* The Paper (Curved Sheet) */}
                <mesh position={[0, 2, -0.5]} rotation={[-0.2, 0, 0]}>
                    <boxGeometry args={[7, 4, 0.05]} />
                    <meshStandardMaterial color="#F4F1EA" roughness={0.9} />
                </mesh>
            </group>

            {/* The Keyboard (Typing Wave) */}
            <group position={[0, 0.5, 1]}>
                {keys.map((k) => (
                    <AnimatedKey key={k.id} data={k} />
                ))}
            </group>
        </group>
    );
}

function AnimatedKey({ data }: { data: any }) {
    const ref = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Typing wave animation: keys go down and up
        const wave = Math.sin(t * 5 + data.delay);
        // Only move if wave is negative (pressing down)
        ref.current.position.y = data.y + (wave < -0.5 ? -0.2 : 0);
    });

    return (
        <group ref={ref} position={[data.x, data.y, data.z]}>
            <TypewriterKey char={data.char} scale={0.8} />
        </group>
    )
}
