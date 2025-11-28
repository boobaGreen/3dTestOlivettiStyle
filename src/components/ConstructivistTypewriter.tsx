import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { TypewriterKey } from './TypewriterKey';

export function ConstructivistTypewriter({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number], scale?: number }) {
    const group = useRef<THREE.Group>(null!);
    const carriage = useRef<THREE.Group>(null!);

    useFrame((state) => {
        // Animate Carriage moving left/right - SLOWER
        const t = state.clock.elapsedTime;
        carriage.current.position.x = Math.sin(t * 0.5) * 1.5;

        // Gentle float of entire machine
        group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
        group.current.rotation.y = Math.sin(t * 0.2) * 0.02; 
    });

    // Generate keyboard grid
    const keys = [];
    const rows = 4;
    const cols = 9; // Reduced from 10
    const spacing = 0.75; // Increased from 0.6

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Row 3 (Last Row) Logic:
            // Spacebar occupies 3, 4, 5.
            // User wants to remove keys "next to bar" (2 and 6) leaving gaps.
            if (r === 3) {
                if (c >= 3 && c <= 5) continue; // Spacebar area
                if (c === 2 || c === 6) continue; // Gaps next to spacebar
            }

            keys.push({
                id: `key-${r}-${c}`,
                char: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
                // Center: (cols - 1) / 2 = 4
                x: (c - (cols - 1) / 2) * spacing,
                z: (r - rows / 2) * spacing + 2,
                y: 0, 
                delay: Math.random() * 10 // Larger delay range for variety
            });
        }
    }

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Chassis (The Body) - Bakelite Material */}
            {/* Main Body (Rear) */}
            <RoundedBox args={[8, 2, 4]} radius={0.5} smoothness={4} position={[0, 0, -1]}>
                <meshPhysicalMaterial
                    color="#008F95"
                    roughness={0.2}
                    metalness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </RoundedBox>

            {/* Keyboard Bed (Front) */}
            <RoundedBox args={[8, 0.5, 4]} radius={0.2} smoothness={4} position={[0, -0.75, 2]}>
                <meshPhysicalMaterial
                    color="#008F95"
                    roughness={0.2}
                    metalness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </RoundedBox>

            {/* The Carriage (The Roller & Housing) */}
            <group ref={carriage} position={[0, 1.5, -1]}>
                {/* Carriage Housing (The moving tray) */}
                <RoundedBox args={[9, 0.5, 1.5]} radius={0.1} smoothness={4} position={[0, -0.5, 0]}>
                     <meshPhysicalMaterial color="#008F95" roughness={0.2} metalness={0.1} clearcoat={1} />
                </RoundedBox>

                {/* Roller (Platen) - Shorter */}
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.5, 0.5, 8, 32]} />
                    <meshStandardMaterial color="#111" roughness={0.8} />
                </mesh>

                {/* Knob Left */}
                <mesh position={[-4.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Knob Right */}
                <mesh position={[4.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
                    <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Return Lever */}
                <group position={[-4.5, 0.5, 0.5]} rotation={[0, 0, 0.2]}>
                    <mesh position={[0, 0.5, 0]}>
                        <boxGeometry args={[0.1, 1.5, 0.1]} />
                        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 1.2, 0.2]} rotation={[Math.PI/2, 0, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
                        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
                    </mesh>
                </group>

                {/* The Paper (Curved Sheet) */}
                <mesh position={[0, 1.5, -0.5]} rotation={[-0.2, 0, 0]}>
                    <boxGeometry args={[6, 4, 0.05]} />
                    <meshStandardMaterial color="#F4F1EA" roughness={0.9} />
                </mesh>
            </group>

            {/* The Keyboard (Typing Wave) */}
            <group position={[0, -0.3, 1]}>
                {keys.map((k) => (
                    <AnimatedKey key={k.id} data={k} />
                ))}
                {/* Spacebar - Replaces middle keys of last row */}
                <group position={[0, 0, 2.9]}>
                     <RoundedBox args={[2.5, 0.2, 0.5]} radius={0.05} smoothness={4}>
                        <meshPhysicalMaterial color="#2C2C2C" roughness={0.4} metalness={0.1} clearcoat={0.5} />
                     </RoundedBox>
                </group>
            </group>
        </group>
    );
}

function AnimatedKey({ data }: { data: any }) {
    const ref = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Burst Typing Animation
        // High frequency sine (typing speed) modulated by low frequency noise (pauses)
        const speed = 8;
        const burst = Math.sin(t * 0.5 + data.delay); // Slow wave for bursts
        const type = Math.sin(t * speed + data.delay * 5); // Fast typing
        
        // Only type when burst is high
        const active = burst > 0.5 ? type : 1; 
        
        // Key press logic
        ref.current.position.y = data.y + (active < -0.5 ? -0.15 : 0);
    });

    return (
        <group ref={ref} position={[data.x, data.y, data.z]}>
            <TypewriterKey char={data.char} scale={0.8} />
        </group>
    )
}
