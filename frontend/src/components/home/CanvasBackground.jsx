import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Create abstract geometric floating mesh that reacts to scroll
const FloatingGeometry = ({ position, rotation, scale, color, scrollSpeed = 1, type = 'icosahedron' }) => {
    const meshRef = useRef();

    useFrame(() => {
        if (!meshRef.current) return;
        // Basic steady rotation
        meshRef.current.rotation.x += 0.002;
        meshRef.current.rotation.y += 0.003;
        
        // Parallax scroll reaction: Translate Y based on scrollY
        const scrollY = window.scrollY;
        // Calculate offset based on scroll and defined speed
        const targetY = position[1] + (scrollY * 0.005 * scrollSpeed);
        // Smoothly interpolate current position to target for fluid CSS-like parallax
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
                {type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
                {type === 'torus' && <torusGeometry args={[1.5, 0.4, 16, 100]} />}
                {type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
                <meshStandardMaterial 
                    color={color} 
                    roughness={0.2} 
                    metalness={0.8}
                    wireframe={type === 'octahedron'}
                />
            </mesh>
        </Float>
    );
};

// Particles generation helper - moved outside to satisfy purity rules
const generateParticles = (count) => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        // Distribute particles across a very tall vertical cylinder area to cover scroll tracking
        positions[i * 3] = (Math.random() - 0.5) * 40;     // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 80; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10; // z
        scales[i] = Math.random();
    }
    return [positions, scales];
};

// Advanced particle system bound directly to scroll offset
const ParticleSystem = () => {
    const pointsRef = useRef();
    
    // Generate thousands of scattered points
    const count = 3000;
    const [positions, scales] = useMemo(() => generateParticles(count), [count]);

    useFrame(() => {
        if (!pointsRef.current) return;
        // Parallax effect on the entire particle cloud system
        const scrollY = window.scrollY;
        pointsRef.current.position.y = scrollY * 0.01;
        // Slow constant rotation
        pointsRef.current.rotation.y += 0.0005;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-scale" count={count} array={scales} itemSize={1} />
            </bufferGeometry>
            <pointsMaterial 
                size={0.15} 
                color="#6366f1" 
                sizeAttenuation={true} 
                transparent={true} 
                opacity={0.6}
            />
        </points>
    );
};


const CanvasBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#4f46e5" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#ec4899" />
                <Environment preset="city" />

                {/* Particle Cloud */}
                <ParticleSystem />
                
                {/* Static Space Background Stars (independent of our localized particles) */}
                <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Floating Parallax Geometries */}
                {/* Left Side Group */}
                <FloatingGeometry position={[-6, 2, -2]} scale={1.5} color="#8b5cf6" scrollSpeed={0.8} type="icosahedron" />
                <FloatingGeometry position={[-8, -8, -5]} scale={2} color="#3b82f6" scrollSpeed={1.5} type="torus" />
                
                {/* Right Side Group */}
                <FloatingGeometry position={[6, -3, -3]} scale={1.8} color="#ec4899" scrollSpeed={1.2} type="octahedron" />
                <FloatingGeometry position={[7, 10, -8]} scale={3} color="#10b981" scrollSpeed={0.5} type="icosahedron" />
                
                {/* Center Depth Group */}
                <FloatingGeometry position={[0, -15, -10]} scale={4} color="#6366f1" scrollSpeed={2} type="torus" />
                <FloatingGeometry position={[3, -25, -5]} scale={2.5} color="#f59e0b" scrollSpeed={1.1} type="icosahedron" />
            </Canvas>
        </div>
    );
};

export default CanvasBackground;
