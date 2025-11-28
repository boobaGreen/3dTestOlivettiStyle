import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { Spring } from './MechanicalParts';

export function DataViz({ position, ...props }: any) {
    const group = useRef<THREE.Group>(null!);

    // Fake data for the chart
    const data = [0.3, 0.5, 0.8, 0.4, 0.9, 0.6];

    useFrame((state) => {
        // Gentle floating for the whole chart
        group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    });

    return (
        <group ref={group} position={position} {...props}>
            {data.map((value, i) => (
                <group key={i} position={[(i - 2.5) * 1.5, 0, 0]}>
                    {/* The Bar (Spring) */}
                    <Spring
                        position={[0, value * 2, 0]}
                        scale={[1, value * 4, 1]}
                        rotation={[0, 0, 0]}
                    />
                    {/* Label */}
                    <Text
                        position={[0, -0.5, 0]}
                        fontSize={0.3}
                        color="#2C2C2C"
                        anchorX="center"
                        anchorY="top"
                    >
                        {`0${i + 1}`}
                    </Text>
                </group>
            ))}
            <Text
                position={[0, -1.5, 0]}
                fontSize={0.5}
                color="#D33F49"
                anchorX="center"
                anchorY="top"
            >
                GROWTH METRICS
            </Text>
        </group>
    );
}
