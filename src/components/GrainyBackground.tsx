import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { LayerMaterial, Color, Noise } from 'lamina';
import * as THREE from 'three';

// Helper to interpolate colors (same as in Scene.tsx)
const lerpColor = (color1: string, color2: string, t: number) => {
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    return c1.lerp(c2, t);
};

export function GrainyBackground() {
    const scroll = useScroll();
    const colorLayer = useRef<any>(null!);
    const { scene } = useThree();

    useFrame(() => {
        const r1 = scroll.range(0, 0.2);
        const r2 = scroll.range(0.2, 0.2);
        const r3 = scroll.range(0.4, 0.2);
        const r4 = scroll.range(0.6, 0.3);

        let targetColor = new THREE.Color('#F4F1EA');

        if (r1 > 0 && r1 < 1) targetColor = lerpColor('#F4F1EA', '#2C2C2C', r1);
        else if (r1 === 1 && r2 < 1) targetColor = lerpColor('#2C2C2C', '#008F95', r2);
        else if (r2 === 1 && r3 < 1) targetColor = lerpColor('#008F95', '#D33F49', r3);
        else if (r3 === 1) targetColor = lerpColor('#D33F49', '#E0CA3C', r4);

        // Update the Lamina Color layer
        if (colorLayer.current) {
            colorLayer.current.color.set(targetColor);
        }

        // Update Fog to match (optional, but good for depth)
        scene.fog = new THREE.Fog(targetColor, 5, 40);
    });

    return (
        <mesh scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial side={THREE.BackSide}>
                <Color ref={colorLayer} color="#F4F1EA" />
                <Noise 
                    colorA="#2C2C2C" 
                    colorB="#F4F1EA" 
                    colorC="#F4F1EA" 
                    colorD="#F4F1EA" 
                    alpha={0.15} 
                    scale={1} 
                    type="perlin" 
                    mode="overlay"
                />
            </LayerMaterial>
        </mesh>
    );
}
