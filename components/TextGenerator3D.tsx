"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene3D } from "./Scene3D";
import { ControlPanel } from "./ControlPanel";

export type MaterialType = "metallic" | "chrome" | "gold" | "glass" | "neon" | "plastic";
export type EnvironmentPreset = "studio" | "sunset" | "dawn" | "night" | "warehouse" | "city";
export type PresetName = "chrome" | "gold" | "neon-blue" | "neon-pink" | "glass" | "matte" | "holographic";

export interface TextSettings {
  text: string;
  fontSize: number;
  depth: number;
  letterSpacing: number;
  bevelEnabled: boolean;
  bevelThickness: number;
  bevelSize: number;
}

export interface MaterialSettings {
  type: MaterialType;
  color: string;
  roughness: number;
  metalness: number;
  emissiveIntensity: number;
  opacity: number;
}

export interface SceneSettings {
  autoRotate: boolean;
  rotationSpeed: number;
  backgroundColor: string;
  backgroundGradient: boolean;
  gradientColorTop: string;
  gradientColorBottom: string;
  showGrid: boolean;
  showReflection: boolean;
}

export interface LightingSettings {
  ambientIntensity: number;
  directionalIntensity: number;
  directionalPosition: [number, number, number];
  environmentPreset: EnvironmentPreset;
}

export interface ExportSettings {
  format: "png" | "jpeg";
  resolution: 1 | 2 | 4;
  transparentBackground: boolean;
}

const defaultTextSettings: TextSettings = {
  text: "Hello",
  fontSize: 0.8,
  depth: 0.3,
  letterSpacing: 0.02,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
};

const defaultMaterialSettings: MaterialSettings = {
  type: "metallic",
  color: "#6366f1",
  roughness: 0.2,
  metalness: 0.8,
  emissiveIntensity: 1,
  opacity: 0.8,
};

const defaultSceneSettings: SceneSettings = {
  autoRotate: true,
  rotationSpeed: 0.5,
  backgroundColor: "#f8fafc",
  backgroundGradient: true,
  gradientColorTop: "#f8fafc",
  gradientColorBottom: "#e2e8f0",
  showGrid: false,
  showReflection: true,
};

const defaultLightingSettings: LightingSettings = {
  ambientIntensity: 0.5,
  directionalIntensity: 1.5,
  directionalPosition: [5, 5, 5],
  environmentPreset: "studio",
};

const defaultExportSettings: ExportSettings = {
  format: "png",
  resolution: 2,
  transparentBackground: false,
};

const presetConfigs: Record<PresetName, Partial<MaterialSettings>> = {
  chrome: {
    type: "chrome",
    color: "#e5e7eb",
    roughness: 0.05,
    metalness: 1,
  },
  gold: {
    type: "gold",
    color: "#fbbf24",
    roughness: 0.2,
    metalness: 1,
  },
  "neon-blue": {
    type: "neon",
    color: "#3b82f6",
    roughness: 0.3,
    metalness: 0.5,
    emissiveIntensity: 2,
  },
  "neon-pink": {
    type: "neon",
    color: "#ec4899",
    roughness: 0.3,
    metalness: 0.5,
    emissiveIntensity: 2,
  },
  glass: {
    type: "glass",
    color: "#93c5fd",
    roughness: 0.1,
    metalness: 0,
    opacity: 0.6,
  },
  matte: {
    type: "plastic",
    color: "#1f2937",
    roughness: 0.9,
    metalness: 0,
  },
  holographic: {
    type: "metallic",
    color: "#a78bfa",
    roughness: 0.1,
    metalness: 0.9,
  },
};

export function TextGenerator3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textSettings, setTextSettings] = useState<TextSettings>(defaultTextSettings);
  const [materialSettings, setMaterialSettings] = useState<MaterialSettings>(defaultMaterialSettings);
  const [sceneSettings, setSceneSettings] = useState<SceneSettings>(defaultSceneSettings);
  const [lightingSettings, setLightingSettings] = useState<LightingSettings>(defaultLightingSettings);
  const [exportSettings, setExportSettings] = useState<ExportSettings>(defaultExportSettings);
  const [activeTab, setActiveTab] = useState<"text" | "material" | "scene" | "lighting" | "export">("text");
  const [isExporting, setIsExporting] = useState(false);

  const applyPreset = useCallback((preset: PresetName) => {
    const config = presetConfigs[preset];
    setMaterialSettings((prev) => ({ ...prev, ...config }));
  }, []);

  const resetAll = useCallback(() => {
    setTextSettings(defaultTextSettings);
    setMaterialSettings(defaultMaterialSettings);
    setSceneSettings(defaultSceneSettings);
    setLightingSettings(defaultLightingSettings);
    setExportSettings(defaultExportSettings);
  }, []);

  const handleExport = useCallback(() => {
    if (!canvasRef.current) return;

    setIsExporting(true);

    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setIsExporting(false);
        return;
      }

      try {
        const { format, resolution, transparentBackground } = exportSettings;
        
        const tempCanvas = document.createElement("canvas");
        const ctx = tempCanvas.getContext("2d");
        
        if (!ctx) {
          setIsExporting(false);
          return;
        }

        const width = canvas.width * resolution;
        const height = canvas.height * resolution;
        
        tempCanvas.width = width;
        tempCanvas.height = height;

        if (!transparentBackground || format === "jpeg") {
          if (sceneSettings.backgroundGradient) {
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, sceneSettings.gradientColorTop);
            gradient.addColorStop(1, sceneSettings.gradientColorBottom);
            ctx.fillStyle = gradient;
          } else {
            ctx.fillStyle = sceneSettings.backgroundColor;
          }
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(canvas, 0, 0, width, height);

        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        const quality = format === "jpeg" ? 0.95 : undefined;
        const dataUrl = tempCanvas.toDataURL(mimeType, quality);
        
        const link = document.createElement("a");
        link.download = `3d-text-${textSettings.text || "export"}.${format}`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Export failed:", error);
      }

      setIsExporting(false);
    }, 100);
  }, [exportSettings, sceneSettings, textSettings.text]);

  const backgroundStyle = useMemo(() => {
    if (sceneSettings.backgroundGradient) {
      return {
        background: `linear-gradient(to bottom, ${sceneSettings.gradientColorTop}, ${sceneSettings.gradientColorBottom})`,
      };
    }
    return { backgroundColor: sceneSettings.backgroundColor };
  }, [sceneSettings.backgroundGradient, sceneSettings.gradientColorTop, sceneSettings.gradientColorBottom, sceneSettings.backgroundColor]);

  return (
    <div className="flex h-screen w-full p-4 gap-4" style={backgroundStyle}>
      {/* Control Panel - Detached with margins */}
      <ControlPanel
        textSettings={textSettings}
        setTextSettings={setTextSettings}
        materialSettings={materialSettings}
        setMaterialSettings={setMaterialSettings}
        sceneSettings={sceneSettings}
        setSceneSettings={setSceneSettings}
        lightingSettings={lightingSettings}
        setLightingSettings={setLightingSettings}
        exportSettings={exportSettings}
        setExportSettings={setExportSettings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExport={handleExport}
        isExporting={isExporting}
        applyPreset={applyPreset}
        resetAll={resetAll}
      />

      {/* 3D Canvas */}
      <div className="flex-1 relative rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-sm">
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          dpr={[1, 2]}
        >
          <Scene3D
            textSettings={textSettings}
            materialSettings={materialSettings}
            sceneSettings={sceneSettings}
            lightingSettings={lightingSettings}
          />
        </Canvas>

        {/* Keyboard shortcuts hint */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-xs text-gray-500 border border-gray-200/50 shadow-sm">
          <span className="font-medium">Controls:</span> Drag to rotate • Scroll to zoom • Shift+drag to pan
        </div>

        {/* Current text preview */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200/50 shadow-sm">
          <span className="text-xs text-gray-500">Preview:</span>
          <span className="ml-2 font-medium text-gray-900">{textSettings.text || "Hello"}</span>
        </div>
      </div>
    </div>
  );
}
