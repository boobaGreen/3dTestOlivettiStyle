import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TheGyroscope({ scale = 1, position = [0, 0, 0] }: { scale?: number, position?: [number, number, number] }) {
    const ring1 = useRef<THREE.Mesh>(null!);
    const ring2 = useRef<THREE.Mesh>(null!);
    const ring3 = useRef<THREE.Mesh>(null!);
    const core = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Independent rotations
        ring1.current.rotation.x = t * 0.5;
        ring1.current.rotation.y = t * 0.2;

        ring2.current.rotation.x = t * 0.3;
        ring2.current.rotation.z = t * 0.4;

        ring3.current.rotation.y = t * 0.6;
        ring3.current.rotation.z = t * 0.2;

        // Core pulsing
        const scale = 1 + Math.sin(t * 2) * 0.1;
        core.current.scale.set(scale, scale, scale);
    });

    const Ring = ({ size, color, refProp }: { size: number, color: string, refProp: any }) => (
        <mesh ref={refProp}>
            <torusGeometry args={[size, 0.1, 16, 64]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
    );

    return (
        <group position={position} scale={scale}>
            <Ring size={2} color="#D33F49" refProp={ring1} />
            <Ring size={1.5} color="#008F95" refProp={ring2} />
            <Ring size={1} color="#E0CA3C" refProp={ring3} />

            {/* Central Core (The "Profit" Check) */}
            <mesh ref={core}>
                <octahedronGeometry args={[0.5]} />
                <meshStandardMaterial color="#FCF6F5" emissive="#FCF6F5" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}
