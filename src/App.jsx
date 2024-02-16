

import React from 'react';
import { Canvas } from '@react-three/fiber';
import ProcGenGrid from './components/procGenGrid.jsx';
import { OrbitControls } from '@react-three/drei';
function R3fScene() {
    return (
        <Canvas style={{height:'100%',width:'100%'}}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <ProcGenGrid />
            <OrbitControls />
        </Canvas>
    );
}

export default R3fScene;