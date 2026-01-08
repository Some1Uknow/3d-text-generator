"use client";

import { useMemo } from "react";
import { Text3D } from "@react-three/drei";
import * as THREE from "three";
import type { TextSettings, MaterialSettings } from "./TextGenerator3D";

interface Text3DModelProps {
  textSettings: TextSettings;
  materialSettings: MaterialSettings;
}

export function Text3DModel({ textSettings, materialSettings }: Text3DModelProps) {
  const material = useMemo(() => {
    const color = new THREE.Color(materialSettings.color);

    switch (materialSettings.type) {
      case "metallic":
        return new THREE.MeshStandardMaterial({
          color,
          roughness: materialSettings.roughness,
          metalness: materialSettings.metalness,
          envMapIntensity: 1,
        });

      case "chrome":
        return new THREE.MeshStandardMaterial({
          color: new THREE.Color("#e5e7eb"),
          roughness: 0.05,
          metalness: 1,
          envMapIntensity: 1.5,
        });

      case "gold":
        return new THREE.MeshStandardMaterial({
          color: new THREE.Color("#fbbf24"),
          roughness: 0.2,
          metalness: 1,
          envMapIntensity: 1.2,
        });

      case "glass":
        return new THREE.MeshPhysicalMaterial({
          color,
          roughness: materialSettings.roughness,
          metalness: 0,
          transmission: 0.9,
          thickness: 0.5,
          transparent: true,
          opacity: materialSettings.opacity,
          ior: 1.5,
          envMapIntensity: 1,
        });

      case "neon":
        return new THREE.MeshStandardMaterial({
          color,
          roughness: materialSettings.roughness,
          metalness: materialSettings.metalness,
          emissive: color,
          emissiveIntensity: materialSettings.emissiveIntensity,
        });

      case "plastic":
        return new THREE.MeshStandardMaterial({
          color,
          roughness: materialSettings.roughness,
          metalness: 0,
          envMapIntensity: 0.5,
        });

      default:
        return new THREE.MeshStandardMaterial({
          color,
          roughness: materialSettings.roughness,
          metalness: materialSettings.metalness,
        });
    }
  }, [materialSettings]);

  const textToRender = textSettings.text || "Hello";

  return (
    <Text3D
      font="/fonts/Inter_Bold.json"
      size={textSettings.fontSize}
      height={textSettings.depth}
      letterSpacing={textSettings.letterSpacing}
      bevelEnabled={textSettings.bevelEnabled}
      bevelThickness={textSettings.bevelThickness}
      bevelSize={textSettings.bevelSize}
      bevelSegments={8}
      curveSegments={16}
      material={material}
    >
      {textToRender}
    </Text3D>
  );
}
