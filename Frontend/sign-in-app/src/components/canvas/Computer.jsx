import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { useTheme, useMediaQuery } from '@mui/material';

const Computer = ({ onError, onLoad }) => {
    const computerRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const computer = useGLTF("/computer/computer.gltf", undefined, (error) => {
        console.error("Error al cargar el modelo:", error);
        setHasError(true);
        onError();
    });

    useEffect(() => {
        if (computer && computer.scene && !hasError) {
            setIsLoading(false);
            if (onLoad) onLoad();
        }

        return () => {
            if (computer && computer.scene) {
                computer.scene.traverse((object) => {
                    if (object.geometry) {
                        object.geometry.dispose();
                    }
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                });
            }
        };
    }, [computer, onLoad, hasError]);

    useFrame(() => {
        if (computerRef.current && !isLoading && !hasError && computer.scene) {
            computerRef.current.updateMatrixWorld();
        }
    });

    if (isLoading || hasError || !computer.scene) return null;

    return (
        <group ref={computerRef} position={[0, -2, 0]}>
            <ambientLight intensity={0.25} />
            <directionalLight 
                position={[5, 5, 5]} 
                angle={0.12}
                intensity={1} 
                penumbra={0.12} 
                castShadow 
                shadow-mapSize={1024} 
            />
            <pointLight position={[0, 2, 5]} intensity={1} />
            <primitive 
                object={computer.scene} 
                scale={0.5} 
                position-y={0}
                rotation-y={0} 
            />
        </group>
    );
};

const ComputerCanvas = ({ onError, onLoad }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Canvas 
            shadows 
            dpr={[1, 2]} 
            camera={{
                position: [20, 15, 20], 
                fov: 20, 
                near: 0.1, 
                far: 200
            }} 
            gl={{ preserveDrawingBuffer: true }} 
        >
            <Suspense fallback={null}>
                <Preload all />
                <Computer onError={onError} onLoad={onLoad} />
                <OrbitControls 
                    autoRotate 
                    enableZoom={isMobile ? true : false}
                    maxPolarAngle={Math.PI / 2.5} 
                />
            </Suspense>
        </Canvas>
    )
}

export default ComputerCanvas;