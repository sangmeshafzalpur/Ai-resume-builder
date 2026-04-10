import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, OrbitControls, Environment, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const EarthGlobe = () => {
  const groupRef = useRef();
  
  // Create latitudes and longitudes lines to make a nice wireframe globe look
  const lines = [];
  const segments = 32;
  const radius = 2.5;
  
  // Equator and Parallels
  for (let i = 1; i < 8; i++) {
    const lat = (Math.PI / 8) * i;
    const y = Math.cos(lat) * radius;
    const r = Math.sin(lat) * radius;
    
    const points = [];
    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
    }
    lines.push(points);
  }

  // Meridians
  for (let i = 0; i < 16; i++) {
    const theta = (Math.PI / 8) * i;
    const points = [];
    for (let j = 0; j <= segments; j++) {
      const phi = (j / segments) * Math.PI;
      points.push(new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * radius,
        Math.cos(phi) * radius,
        Math.sin(phi) * Math.sin(theta) * radius
      ));
    }
    lines.push(points);
  }

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Auto-rotation
    groupRef.current.rotation.y += 0.002;
    groupRef.current.rotation.x += 0.0005;

    // Mouse Parallax Effect tightly bound to normalized mouse coordinates
    const targetX = (state.pointer.x * 0.5);
    const targetY = (state.pointer.y * 0.5);
    
    // Smooth dampening
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Base dark solid sphere */}
      <Sphere args={[radius * 0.98, 64, 64]}>
        <meshStandardMaterial 
          color="#020617" 
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Wireframe grids around the sphere */}
      {lines.map((points, index) => (
         <Line 
           key={index} 
           points={points} 
           color="#6366f1" 
           lineWidth={1.5} 
           opacity={0.3} 
           transparent 
         />
      ))}
      
      {/* Glowing atmosphere */}
      <Sphere args={[radius * 1.05, 32, 32]}>
        <meshBasicMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.05} 
          side={THREE.BackSide} 
        />
      </Sphere>
    </group>
  );
};

const GlobeCanvas = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#020617] overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#8b5cf6" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <EarthGlobe />
        </Float>
        
        {/* Subtle camera movement for secondary parallax */}
        <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false} 
        />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-transparent to-black/50 pointer-events-none" />
    </div>
  );
};

export default GlobeCanvas;
