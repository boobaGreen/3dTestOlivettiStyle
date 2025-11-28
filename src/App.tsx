import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Loader } from '@react-three/drei';
import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.1}>
            {/* 3D Content that moves/reacts to scroll */}
            <Scene />

            {/* HTML Content that scrolls */}
            <Scroll html style={{ width: '100%', height: '100%' }}>
              <Overlay />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
