"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Center, Environment, ContactShadows, Grid } from "@react-three/drei";
import { Text3DModel } from "./Text3DModel";
import type { TextSettings, MaterialSettings, SceneSettings, LightingSettings } from "./TextGenerator3D";
import type { Group } from "three";

interface Scene3DProps {
  textSettings: TextSettings;
  materialSettings: MaterialSettings;
  sceneSettings: SceneSettings;
  lightingSettings: LightingSettings;
}

function RotatingGroup({
  children,
  autoRotate,
  rotationSpeed,
}: {
  children: React.ReactNode;
  autoRotate: boolean;
  rotationSpeed: number;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#e5e7eb" wireframe />
    </mesh>
  );
}

export function Scene3D({
  textSettings,
  materialSettings,
  sceneSettings,
  lightingSettings,
}: Scene3DProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={lightingSettings.ambientIntensity} />
      <directionalLight
        position={lightingSettings.directionalPosition}
        intensity={lightingSettings.directionalIntensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight
        position={[-5, 3, -5]}
        intensity={lightingSettings.directionalIntensity * 0.3}
      />

      {/* Environment for reflections */}
      <Environment preset={lightingSettings.environmentPreset} />

      {/* 3D Text */}
      <Suspense fallback={<LoadingFallback />}>
        <RotatingGroup
          autoRotate={sceneSettings.autoRotate}
          rotationSpeed={sceneSettings.rotationSpeed}
        >
          <Center>
            <Text3DModel
              textSettings={textSettings}
              materialSettings={materialSettings}
            />
          </Center>
        </RotatingGroup>
      </Suspense>

      {/* Contact Shadow */}
      {sceneSettings.showReflection && (
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
      )}

      {/* Grid */}
      {sceneSettings.showGrid && (
        <Grid
          position={[0, -1.5, 0]}
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#e5e7eb"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#d1d5db"
          fadeDistance={15}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
        />
      )}

      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={15}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />
    </>
  );
}
