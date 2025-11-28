import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type ShapeType = 'sphere' | 'box' | 'cone' | 'torus' | 'icosahedron';
type MaterialType = 'matte' | 'metal' | 'glass';

interface PintoriShapeProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    color?: string;
    shape?: ShapeType;
    materialType?: MaterialType;
}

export function PintoriShape({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    color = "#D33F49",
    shape = 'sphere',
    materialType = 'matte'
}: PintoriShapeProps) {
    const mesh = useRef<THREE.Mesh>(null!);

    // Random rotation speed
    const rotSpeed = useRef([
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
    ]);

    useFrame((_state, delta) => {
        mesh.current.rotation.x += rotSpeed.current[0] * delta;
        mesh.current.rotation.y += rotSpeed.current[1] * delta;
        mesh.current.rotation.z += rotSpeed.current[2] * delta;
    });

    const Geometry = () => {
        switch (shape) {
            case 'box': return <boxGeometry args={[1, 1, 1]} />;
            case 'cone': return <coneGeometry args={[0.5, 1, 32]} />;
            case 'torus': return <torusGeometry args={[0.4, 0.15, 16, 32]} />;
            case 'icosahedron': return <icosahedronGeometry args={[0.6, 0]} />;
            case 'sphere': default: return <sphereGeometry args={[0.5, 32, 32]} />;
        }
    };

    const Material = () => {
        switch (materialType) {
            case 'glass':
                return <meshPhysicalMaterial
                    color={color}
                    roughness={0}
                    metalness={0.1}
                    transmission={0.9}
                    thickness={1}
                    clearcoat={1}
                />;
            case 'metal':
                return <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.8}
                />;
            case 'matte': default:
                return <meshStandardMaterial
                    color={color}
                    roughness={0.8}
                    metalness={0.1}
                />;
        }
    };

    return (
        <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
            <Geometry />
            <Material />
        </mesh>
    );
}
