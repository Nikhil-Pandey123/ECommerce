'use client';
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  const { scene } = useGLTF('/models/outfit.glb');
  const groupRef = useRef<THREE.Group>(null);

  // Center the model manually
  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      groupRef.current.position.sub(center); // Center the model
    }
  }, []);

  // Optional rotation
  useFrame(state => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    // INCREASED: Changed scale from [10, 10, 10] to [15, 15, 15] or higher
    <group ref={groupRef} scale={[15, 15, 15]}>
      <primitive object={scene} />
    </group>
  );
};

export default function GLBViewer() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 50], fov: 30 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
