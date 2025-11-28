import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Simple lerp helper
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export function TypewriterKey({ position = [0, 0, 0], char = "A", color = "#F4F1EA", ...props }: any) {
    const group = useRef<THREE.Group>(null!);
    const [hovered, setHover] = useState(false);

    useFrame((_state, delta) => {
        // Hover effect: Subtle lift and tilt
        const targetY = hovered ? 0.1 : 0;
        group.current.position.y = lerp(group.current.position.y, position[1] + targetY, delta * 10);

        if (hovered) {
            group.current.rotation.x = lerp(group.current.rotation.x, 0.2, delta * 5);
        } else {
            group.current.rotation.x = lerp(group.current.rotation.x, 0, delta * 5);
        }
    });

    return (
        <group
            ref={group}
            position={position}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            {...props}
        >
            {/* Key Stem */}
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
                <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Key Cap (Concave) */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.35, 0.3, 0.15, 32]} />
                <meshPhysicalMaterial
                    color="#1a1a1a"
                    roughness={0.2}
                    metalness={0.1}
                    clearcoat={1}
                />
            </mesh>



            {/* Character */}
            <Text
                position={[0, 0.08, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.25}
                color="#F4F1EA"
                anchorX="center"
                anchorY="middle"
            >
                {char}
            </Text>
        </group>
    );
}
