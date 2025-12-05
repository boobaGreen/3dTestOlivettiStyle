import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Environment, Stars, Text, Line } from '@react-three/drei';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ConstructivistTypewriter } from './ConstructivistTypewriter';
import { ConstructivistCity } from './ConstructivistCity';
import { GrainyBackground } from './GrainyBackground';
import { TheMonolith } from './TheMonolith';
import { TheComposition } from './TheComposition';
import { TheGyroscope } from './TheGyroscope';
import { TheGlassVault } from './TheGlassVault';
import { TheLadder } from './TheLadder';

// Helper for non-linear mapping
const remap = (value: number, low1: number, high1: number, low2: number, high2: number) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};

function TheRedThread() {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 8, 0),      // 1. Monolith (Thesis)
            new THREE.Vector3(1.5, -5, -3),  // 2. Typewriter (Solution)
            new THREE.Vector3(-2, -12, 2),   // 3. Composition (Basket)
            new THREE.Vector3(2, -20, -2),   // 4. Gyroscope (Rebalancing)
            new THREE.Vector3(0, -28, 2),    // 5. Glass Vault (Sustainability)
            new THREE.Vector3(-2, -36, -2),  // 6. Ladder (The Work)
            new THREE.Vector3(2, -44, 2),    // 7. City (Governance)
            new THREE.Vector3(0, -52, 0),    // 8. Network (Future)
            new THREE.Vector3(0, -60, 0)     // End
        ]);
    }, []);

    return (
        <mesh>
            <tubeGeometry args={[curve, 128, 0.08, 8, false]} />
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

            {/* 1. The Thesis (Monolith) */}
            <group position={[0, 5, 0]}>
                <TheMonolith scale={0.8} />
                <InfographicLabel position={[2, 2, 0]} text="INFRASTRUCTURE" target={[0.5, 0, 0]} />
            </group>

            {/* 2. The Solution (Typewriter) */}
            <group position={[1.5, -5, -3]}>
                <ConstructivistTypewriter scale={0.7} />
                <InfographicLabel position={[3, 2, 0]} text="ORDER" target={[0, 0, 0]} />
            </group>

            {/* 3. The Basket (Composition) */}
            <group position={[-2, -12, 2]}>
                <TheComposition scale={0.8} />
                <InfographicLabel position={[-0.5, 2.5, 0]} text="DIVERSIFICATION" target={[0, 0, 0]} />
                <InfographicLabel position={[2, -2, 0]} text="RESERVE" target={[0, 0, 0]} />
            </group>

            {/* 4. Rebalancing (Gyroscope) */}
            <group position={[2, -20, -2]}>
                <TheGyroscope scale={0.8} />
                <InfographicLabel position={[2, 2, 0]} text="BALANCE" target={[0, 0, 0]} />
            </group>

            {/* 5. Sustainability (Glass Vault) */}
            <group position={[0, -28, 2]}>
                <TheGlassVault scale={0.8} />
                <InfographicLabel position={[-2, 2, 0]} text="TRANSPARENCY" target={[0, 0, 0]} />
                <InfographicLabel position={[2, 2, 0]} text="TAXATION" target={[0, 0, 0]} />
            </group>

            {/* 6. The Work (Ladder) */}
            <group position={[-2, -36, -2]}>
                <TheLadder scale={0.8} />
                <InfographicLabel position={[-2, 2, 0]} text="MERITOCRACY" target={[0, 1, 0]} />
                <InfographicLabel position={[2, 1, 0]} text="CAREER" target={[1, 2, 0]} />
            </group>

            {/* 7. Governance (City) */}
            <group position={[2, -44, 2]} rotation={[0, -Math.PI / 4, 0]}>
                <ConstructivistCity scale={0.6} />
                <InfographicLabel position={[3, 4, 0]} text="COMMUNITY" target={[0, 2, 0]} />
            </group>

            {/* 8. Future (Network) */}
            <group position={[0, -52, 0]}>
                {Array.from({ length: 20 }).map((_, i) => {
                    const angle = (i / 20) * Math.PI * 2;
                    return (
                        <mesh key={i} position={[Math.cos(angle) * 4, Math.sin(angle) * 2, Math.sin(angle) * 4]}>
                            <sphereGeometry args={[0.2, 16, 16]} />
                            <meshStandardMaterial color="#E0CA3C" emissive="#E0CA3C" emissiveIntensity={1} />
                        </mesh>
                    )
                })}
                <InfographicLabel position={[0, 4, 0]} text="EXPANSION" target={[0, 0, 0]} />
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

        // 8-Section Layout Mapping (approx 0.125 per section)
        // 0.000 - 0.125: Thesis
        // 0.125 - 0.250: Solution
        // 0.250 - 0.375: Basket
        // 0.375 - 0.500: Rebalancing
        // 0.500 - 0.625: Sustainability
        // 0.625 - 0.750: Work (Ladder)
        // 0.750 - 0.875: Governance
        // 0.875 - 1.000: Future

        if (t < 0.125) {
            // 1. Thesis
            targetY = remap(t, 0, 0.125, 5, -2);
            targetZ = remap(t, 0, 0.125, 12, 10);
        } else if (t < 0.25) {
            // 2. Solution
            targetY = remap(t, 0.125, 0.25, -2, -8);
            targetX = remap(t, 0.125, 0.25, 0, 2);
            targetZ = 9;
        } else if (t < 0.375) {
            // 3. Basket
            targetY = remap(t, 0.25, 0.375, -8, -16);
            targetX = remap(t, 0.25, 0.375, 2, -2);
            targetZ = 10;
        } else if (t < 0.5) {
            // 4. Rebalancing
            targetY = remap(t, 0.375, 0.5, -16, -24);
            targetX = remap(t, 0.375, 0.5, -2, 2);
            targetZ = 8;
        } else if (t < 0.625) {
            // 5. Sustainability
            targetY = remap(t, 0.5, 0.625, -24, -32);
            targetX = remap(t, 0.5, 0.625, 2, 0);
            targetZ = 11;
        } else if (t < 0.75) {
            // 6. Work (Ladder)
            targetY = remap(t, 0.625, 0.75, -32, -40); // Move to Ladder (-36)
            targetX = remap(t, 0.625, 0.75, 0, -2);
            targetZ = 9;
        } else if (t < 0.875) {
            // 7. Governance
            targetY = remap(t, 0.75, 0.875, -40, -48); // Move to City (-44)
            targetX = remap(t, 0.75, 0.875, -2, 2);
            targetZ = 12;
        } else {
            // 8. Future
            targetY = remap(t, 0.875, 1, -48, -56); // Move to Network (-52)
            targetX = 0;
            targetZ = 15;
        }

        const spiralX = Math.sin(t * Math.PI * 4) * 1;

        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX + spiralX, 2, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2, delta);

        camera.lookAt(0, targetY - 2, 0);
    });
    return null;
}

export const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#D33F49" />
            <spotLight position={[0, -20, -10]} intensity={5} color="#008F95" angle={1} penumbra={1} />

            <Environment preset="city" />

            <GrainyBackground />
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
