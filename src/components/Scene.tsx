import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Environment, Stars, Text, Line } from '@react-three/drei';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ConstructivistTypewriter } from './ConstructivistTypewriter';
import { ConstructivistCity } from './ConstructivistCity';
import { GrainyBackground } from './GrainyBackground';

// Helper for non-linear mapping
const remap = (value: number, low1: number, high1: number, low2: number, high2: number) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};

function TheRedThread() {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 5, 0),
            new THREE.Vector3(1.5, -5, -3),  // Typewriter (Lower & Closer)
            new THREE.Vector3(-3, -14, 2),   // City
            new THREE.Vector3(0, -20, 5),    // City Zoom Out Point
            new THREE.Vector3(3, -28, -5),   // Network
            new THREE.Vector3(0, -40, 0)     // End
        ]);
    }, []);

    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.08, 8, false]} />
            <meshStandardMaterial color="#D33F49" emissive="#D33F49" emissiveIntensity={0.5} />
        </mesh>
    );
}

function InfographicLabel({ position, text, target }: { position: [number, number, number], text: string, target: [number, number, number] }) {
    return (
        <group>
            <Line points={[position, target]} color="#2C2C2C" lineWidth={1} />
            <Text
                position={position}
                fontSize={0.5}
                color="#2C2C2C"
                anchorX="center"
                anchorY="middle"
            >
                {text}
            </Text>
        </group>
    );
}

function ConstructivistScene() {
    const scroll = useScroll();
    const group = useRef<THREE.Group>(null!);

    useFrame((state, delta) => {
        // Scroll Rotation
        const scrollRot = -scroll.offset * Math.PI * 0.2;

        // Mouse Parallax (Damped)
        const mouseX = state.pointer.x * 0.5;
        const mouseY = state.pointer.y * 0.2;

        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, scrollRot + mouseX, 4, delta);
        group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, mouseY, 4, delta);
    });

    return (
        <group ref={group}>
            <TheRedThread />

            {/* 1. The Machine (Typewriter) - Centered & Closer */}
            <group position={[1.5, -5, -3]}>
                <ConstructivistTypewriter scale={0.7} />
                <InfographicLabel position={[3, 2, 0]} text="TECNOLOGIA" target={[0, 0, 0]} />
            </group>

            {/* 2. The City (Factory) */}
            <group position={[-3, -14, 2]} rotation={[0, Math.PI / 4, 0]}>
                <ConstructivistCity scale={0.6} />
                <InfographicLabel position={[-3, 4, 0]} text="WELFARE" target={[0, 2, 0]} />
                <InfographicLabel position={[4, 2, 0]} text="CULTURA" target={[2, 0, 0]} />
            </group>

            {/* 3. The Network (Web3) */}
            <group position={[3, -28, -5]}>
                {Array.from({ length: 20 }).map((_, i) => {
                    const angle = (i / 20) * Math.PI * 2;
                    return (
                        <mesh key={i} position={[Math.cos(angle) * 4, Math.sin(angle) * 2, Math.sin(angle) * 4]}>
                            <sphereGeometry args={[0.2, 16, 16]} />
                            <meshStandardMaterial color="#E0CA3C" emissive="#E0CA3C" emissiveIntensity={1} />
                        </mesh>
                    )
                })}
                <InfographicLabel position={[0, 4, 0]} text="DECENTRALIZZAZIONE" target={[0, 0, 0]} />
            </group>
        </group>
    );
}

function CameraRig() {
    const scroll = useScroll();
    const { camera } = useThree();

    useFrame((_state, delta) => {
        const t = scroll.offset;
        let targetY = 0;
        let targetZ = 10;
        let targetX = 0;

        // 7-Page Layout Mapping
        if (t < 0.14) {
            // Page 1: Intro -> Typewriter Focus
            // Start at 0, move to -5 (Typewriter level)
            targetY = remap(t, 0, 0.14, 0, -5);
            targetZ = remap(t, 0, 0.14, 10, 8); // Zoom in on Typewriter
        } else if (t < 0.28) {
            // Page 2: Typewriter -> City
            targetY = remap(t, 0.14, 0.28, -5, -10); // Look higher (-10) so building (-14) is at bottom
            targetZ = remap(t, 0.14, 0.28, 8, 8);
        } else if (t < 0.42) {
            // Page 3: City Focus
            targetY = remap(t, 0.28, 0.42, -10, -15); // Start from -10 for smoothness
            targetX = -5;
        } else if (t < 0.57) {
            // Page 4: City Detail (Vertical Layout)
            targetY = remap(t, 0.42, 0.57, -15, -16);
            targetX = 0; // Centered
            targetZ = 12; // Zoom out slightly to fit text
        } else if (t < 0.71) {
            // Page 5: City Zoom Out -> Network
            targetY = remap(t, 0.57, 0.71, -16, -22);
            targetZ = remap(t, 0.57, 0.71, 12, 15);
            targetX = -5;
        } else if (t < 0.85) {
            // Page 6: Network (Vertical Layout)
            targetY = remap(t, 0.71, 0.85, -22, -28);
            targetZ = remap(t, 0.71, 0.85, 15, 12);
            targetX = 0; // Centered
        } else {
            // Page 7: End
            targetY = remap(t, 0.85, 1, -28, -35);
        }

        const spiralX = Math.sin(t * Math.PI * 2) * 2;

        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX + spiralX, 2, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2, delta);

        camera.lookAt(0, targetY - 5, 0);
    });
    return null;
}

export const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#D33F49" />
            {/* Rim Light for artistic edge */}
            <spotLight position={[0, -20, -10]} intensity={5} color="#008F95" angle={1} penumbra={1} />

            <Environment preset="city" />

            <GrainyBackground />

            {/* Stars for depth */}
            <Stars radius={40} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

            <CameraRig />
            <ConstructivistScene />

            <EffectComposer>
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    );
};
