"use client";

import { Dispatch, SetStateAction } from "react";
import type {
  TextSettings,
  MaterialSettings,
  SceneSettings,
  LightingSettings,
  ExportSettings,
  PresetName,
} from "./TextGenerator3D";

interface ControlPanelProps {
  textSettings: TextSettings;
  setTextSettings: Dispatch<SetStateAction<TextSettings>>;
  materialSettings: MaterialSettings;
  setMaterialSettings: Dispatch<SetStateAction<MaterialSettings>>;
  sceneSettings: SceneSettings;
  setSceneSettings: Dispatch<SetStateAction<SceneSettings>>;
  lightingSettings: LightingSettings;
  setLightingSettings: Dispatch<SetStateAction<LightingSettings>>;
  exportSettings: ExportSettings;
  setExportSettings: Dispatch<SetStateAction<ExportSettings>>;
  activeTab: "text" | "material" | "scene" | "lighting" | "export";
  setActiveTab: Dispatch<SetStateAction<"text" | "material" | "scene" | "lighting" | "export">>;
  onExport: () => void;
  isExporting: boolean;
  applyPreset: (preset: PresetName) => void;
  resetAll: () => void;
}

const tabs = [
  { id: "text" as const, label: "Text" },
  { id: "material" as const, label: "Material" },
  { id: "scene" as const, label: "Scene" },
  { id: "lighting" as const, label: "Lighting" },
  { id: "export" as const, label: "Export" },
];

const materialTypes = [
  { id: "metallic" as const, label: "Metallic" },
  { id: "chrome" as const, label: "Chrome" },
  { id: "gold" as const, label: "Gold" },
  { id: "glass" as const, label: "Glass" },
  { id: "neon" as const, label: "Neon" },
  { id: "plastic" as const, label: "Plastic" },
];

const presets: { id: PresetName; label: string; color: string }[] = [
  { id: "chrome", label: "Chrome", color: "#e5e7eb" },
  { id: "gold", label: "Gold", color: "#fbbf24" },
  { id: "neon-blue", label: "Neon Blue", color: "#3b82f6" },
  { id: "neon-pink", label: "Neon Pink", color: "#ec4899" },
  { id: "glass", label: "Glass", color: "#93c5fd" },
  { id: "matte", label: "Matte", color: "#1f2937" },
  { id: "holographic", label: "Holo", color: "#a78bfa" },
];

const environmentPresets = [
  { id: "studio" as const, label: "Studio" },
  { id: "sunset" as const, label: "Sunset" },
  { id: "dawn" as const, label: "Dawn" },
  { id: "night" as const, label: "Night" },
  { id: "warehouse" as const, label: "Warehouse" },
  { id: "city" as const, label: "City" },
];

export function ControlPanel({
  textSettings,
  setTextSettings,
  materialSettings,
  setMaterialSettings,
  sceneSettings,
  setSceneSettings,
  lightingSettings,
  setLightingSettings,
  exportSettings,
  setExportSettings,
  activeTab,
  setActiveTab,
  onExport,
  isExporting,
  applyPreset,
  resetAll,
}: ControlPanelProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900">3D Text Generator</h1>
        <p className="text-sm text-gray-500 mt-0.5">Create stunning 3D typography</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-2 pt-2 gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Text Tab */}
        {activeTab === "text" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Content
              </label>
              <input
                type="text"
                value={textSettings.text}
                onChange={(e) =>
                  setTextSettings((prev) => ({ ...prev, text: e.target.value.slice(0, 20) }))
                }
                placeholder="Enter text..."
                maxLength={20}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
              />
              <p className="text-xs text-gray-400 mt-1">{textSettings.text.length}/20 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size: {textSettings.fontSize.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.3"
                max="2"
                step="0.1"
                value={textSettings.fontSize}
                onChange={(e) =>
                  setTextSettings((prev) => ({ ...prev, fontSize: parseFloat(e.target.value) }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Depth: {textSettings.depth.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={textSettings.depth}
                onChange={(e) =>
                  setTextSettings((prev) => ({ ...prev, depth: parseFloat(e.target.value) }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Letter Spacing: {textSettings.letterSpacing.toFixed(2)}
              </label>
              <input
                type="range"
                min="-0.1"
                max="0.3"
                step="0.01"
                value={textSettings.letterSpacing}
                onChange={(e) =>
                  setTextSettings((prev) => ({ ...prev, letterSpacing: parseFloat(e.target.value) }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Bevel</label>
              <button
                onClick={() =>
                  setTextSettings((prev) => ({ ...prev, bevelEnabled: !prev.bevelEnabled }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  textSettings.bevelEnabled ? "bg-gray-900" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    textSettings.bevelEnabled ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>

            {textSettings.bevelEnabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bevel Thickness: {textSettings.bevelThickness.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.01"
                    max="0.15"
                    step="0.01"
                    value={textSettings.bevelThickness}
                    onChange={(e) =>
                      setTextSettings((prev) => ({
                        ...prev,
                        bevelThickness: parseFloat(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bevel Size: {textSettings.bevelSize.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.01"
                    max="0.1"
                    step="0.005"
                    value={textSettings.bevelSize}
                    onChange={(e) =>
                      setTextSettings((prev) => ({
                        ...prev,
                        bevelSize: parseFloat(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* Material Tab */}
        {activeTab === "material" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quick Presets
              </label>
              <div className="grid grid-cols-4 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.id)}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: preset.color }}
                    />
                    <span className="text-xs text-gray-600">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {materialTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() =>
                      setMaterialSettings((prev) => ({ ...prev, type: type.id }))
                    }
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      materialSettings.type === type.id
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={materialSettings.color}
                  onChange={(e) =>
                    setMaterialSettings((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={materialSettings.color}
                  onChange={(e) =>
                    setMaterialSettings((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roughness: {materialSettings.roughness.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={materialSettings.roughness}
                onChange={(e) =>
                  setMaterialSettings((prev) => ({
                    ...prev,
                    roughness: parseFloat(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metalness: {materialSettings.metalness.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={materialSettings.metalness}
                onChange={(e) =>
                  setMaterialSettings((prev) => ({
                    ...prev,
                    metalness: parseFloat(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>

            {materialSettings.type === "neon" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Glow Intensity: {materialSettings.emissiveIntensity.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={materialSettings.emissiveIntensity}
                  onChange={(e) =>
                    setMaterialSettings((prev) => ({
                      ...prev,
                      emissiveIntensity: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                />
              </div>
            )}

            {materialSettings.type === "glass" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opacity: {materialSettings.opacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={materialSettings.opacity}
                  onChange={(e) =>
                    setMaterialSettings((prev) => ({
                      ...prev,
                      opacity: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                />
              </div>
            )}
          </>
        )}

        {/* Scene Tab */}
        {activeTab === "scene" && (
          <>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Auto Rotate</label>
              <button
                onClick={() =>
                  setSceneSettings((prev) => ({ ...prev, autoRotate: !prev.autoRotate }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  sceneSettings.autoRotate ? "bg-gray-900" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    sceneSettings.autoRotate ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>

            {sceneSettings.autoRotate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rotation Speed: {sceneSettings.rotationSpeed.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={sceneSettings.rotationSpeed}
                  onChange={(e) =>
                    setSceneSettings((prev) => ({
                      ...prev,
                      rotationSpeed: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Gradient Background</label>
              <button
                onClick={() =>
                  setSceneSettings((prev) => ({
                    ...prev,
                    backgroundGradient: !prev.backgroundGradient,
                  }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  sceneSettings.backgroundGradient ? "bg-gray-900" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    sceneSettings.backgroundGradient ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>

            {sceneSettings.backgroundGradient ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Top Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={sceneSettings.gradientColorTop}
                      onChange={(e) =>
                        setSceneSettings((prev) => ({
                          ...prev,
                          gradientColorTop: e.target.value,
                        }))
                      }
                      className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={sceneSettings.gradientColorTop}
                      onChange={(e) =>
                        setSceneSettings((prev) => ({
                          ...prev,
                          gradientColorTop: e.target.value,
                        }))
                      }
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bottom Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={sceneSettings.gradientColorBottom}
                      onChange={(e) =>
                        setSceneSettings((prev) => ({
                          ...prev,
                          gradientColorBottom: e.target.value,
                        }))
                      }
                      className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={sceneSettings.gradientColorBottom}
                      onChange={(e) =>
                        setSceneSettings((prev) => ({
                          ...prev,
                          gradientColorBottom: e.target.value,
                        }))
                      }
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={sceneSettings.backgroundColor}
                    onChange={(e) =>
                      setSceneSettings((prev) => ({
                        ...prev,
                        backgroundColor: e.target.value,
                      }))
                    }
                    className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={sceneSettings.backgroundColor}
                    onChange={(e) =>
                      setSceneSettings((prev) => ({
                        ...prev,
                        backgroundColor: e.target.value,
                      }))
                    }
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Show Grid</label>
              <button
                onClick={() =>
                  setSceneSettings((prev) => ({ ...prev, showGrid: !prev.showGrid }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  sceneSettings.showGrid ? "bg-gray-900" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    sceneSettings.showGrid ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Show Shadow</label>
              <button
                onClick={() =>
                  setSceneSettings((prev) => ({
                    ...prev,
                    showReflection: !prev.showReflection,
                  }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  sceneSettings.showReflection ? "bg-gray-900" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    sceneSettings.showReflection ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </>
        )}

        {/* Lighting Tab */}
        {activeTab === "lighting" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Environment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {environmentPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() =>
                      setLightingSettings((prev) => ({
                        ...prev,
                        environmentPreset: preset.id,
                      }))
                    }
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      lightingSettings.environmentPreset === preset.id
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ambient Light: {lightingSettings.ambientIntensity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={lightingSettings.ambientIntensity}
                onChange={(e) =>
                  setLightingSettings((prev) => ({
                    ...prev,
                    ambientIntensity: parseFloat(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Directional Light: {lightingSettings.directionalIntensity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={lightingSettings.directionalIntensity}
                onChange={(e) =>
                  setLightingSettings((prev) => ({
                    ...prev,
                    directionalIntensity: parseFloat(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Light Position X: {lightingSettings.directionalPosition[0]}
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={lightingSettings.directionalPosition[0]}
                onChange={(e) =>
                  setLightingSettings((prev) => ({
                    ...prev,
                    directionalPosition: [
                      parseFloat(e.target.value),
                      prev.directionalPosition[1],
                      prev.directionalPosition[2],
                    ],
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Light Position Y: {lightingSettings.directionalPosition[1]}
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={lightingSettings.directionalPosition[1]}
                onChange={(e) =>
                  setLightingSettings((prev) => ({
                    ...prev,
                    directionalPosition: [
                      prev.directionalPosition[0],
                      parseFloat(e.target.value),
                      prev.directionalPosition[2],
                    ],
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Light Position Z: {lightingSettings.directionalPosition[2]}
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={lightingSettings.directionalPosition[2]}
                onChange={(e) =>
                  setLightingSettings((prev) => ({
                    ...prev,
                    directionalPosition: [
                      prev.directionalPosition[0],
                      prev.directionalPosition[1],
                      parseFloat(e.target.value),
                    ],
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>
          </>
        )}

        {/* Export Tab */}
        {activeTab === "export" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setExportSettings((prev) => ({ ...prev, format: "png" }))
                  }
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    exportSettings.format === "png"
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  PNG
                </button>
                <button
                  onClick={() =>
                    setExportSettings((prev) => ({ ...prev, format: "jpeg" }))
                  }
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    exportSettings.format === "jpeg"
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  JPEG
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolution
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 4].map((res) => (
                  <button
                    key={res}
                    onClick={() =>
                      setExportSettings((prev) => ({
                        ...prev,
                        resolution: res as 1 | 2 | 4,
                      }))
                    }
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      exportSettings.resolution === res
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {res}x
                  </button>
                ))}
              </div>
            </div>

            {exportSettings.format === "png" && (
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Transparent Background
                </label>
                <button
                  onClick={() =>
                    setExportSettings((prev) => ({
                      ...prev,
                      transparentBackground: !prev.transparentBackground,
                    }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    exportSettings.transparentBackground ? "bg-gray-900" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      exportSettings.transparentBackground ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            )}

            <button
              onClick={onExport}
              disabled={isExporting}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Exporting...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Export Image
                </>
              )}
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100">
        <button
          onClick={resetAll}
          className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
}
