import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PintoriShape } from './PintoriShape';

export function TheComposition({ scale = 1, position = [0, 0, 0] }: { scale?: number, position?: [number, number, number] }) {
    const group = useRef<THREE.Group>(null!);

    useFrame((state) => {
        // Slowly rotate the entire composition
        group.current.rotation.y = state.clock.elapsedTime * 0.1;
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* 1. LINK (The King) - Large Sphere, Central */}
            <PintoriShape
                shape="sphere"
                color="#2A5CAA" // Link Blue-ish
                scale={1.5}
                position={[0, 0, 0]}
                materialType="metal"
            />

            {/* 2. PYTH (The Challenger) - Cube, Offset */}
            <PintoriShape
                shape="box"
                color="#E6DA74" // Pyth Purple/Pink ref -> using Yellow for contrast in our palette
                scale={1}
                position={[2, 1, 0]}
                rotation={[0.5, 0.5, 0]}
            />

            {/* 3. BAND - Cone */}
            <PintoriShape
                shape="cone"
                color="#D33F49" // Red
                scale={0.8}
                position={[-1.5, -1, 1]}
                rotation={[0, 0, 0.5]}
            />

            {/* 4. API3 - Torus */}
            <PintoriShape
                shape="torus"
                color="#008F95" // Teal
                scale={0.7}
                position={[0, 2, -1]}
                rotation={[1, 0, 0]}
            />

            {/* 5. UMA - Icosahedron */}
            <PintoriShape
                shape="icosahedron"
                color="#FCF6F5" // White/Cream
                scale={0.6}
                position={[1, -1.5, -1]}
            />

            {/* Connecting Lines (The "Basket" Structure) */}
            <mesh>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshStandardMaterial color="#2C2C2C" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[1.57, 0, 0]}>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshStandardMaterial color="#2C2C2C" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}
