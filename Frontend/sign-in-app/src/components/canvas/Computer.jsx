import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

const Computer = ({ onError }) => {
    const computer = useGLTF("../../public/computer/Computer.gltf", true, undefined, onError);
    const computerRef = useRef();

    useFrame(() => {
        if (computerRef.current) {
            computerRef.current.updateMatrixWorld();
        }
    });

    return (
        <group ref={computerRef} position={[0, -2, 0]}>
            <ambientLight intensity={0.25} />
            <directionalLight position={[5, 5, 5]} angle={0.12}
                intensity={1} penumbra={0.12} castShadow 
                shadow-mapSize={1024} />
            <pointLight position={[0, 2, 5]} intensity={1} />
            <primitive object={computer.scene} scale={0.5} position-y={0}
                rotation-y={0} />
        </group>
    );
};

const ComputerCanvas = ({ onError }) => {
    return (
        <Canvas shadows dpr={[1, 2]} 
            camera={{position: [20, 15, 20], fov: 20, near: 0.1, far: 200}} 
            gl={{ preserveDrawingBuffer: true }} >
            <Suspense fallback={null}>
                <Preload all />
                <Computer onError={onError} />
                <OrbitControls autoRotate enableZoom={false}
                    maxPolarAngle={Math.PI / 2.5} />
            </Suspense>
        </Canvas>
    )
}

export default ComputerCanvas;