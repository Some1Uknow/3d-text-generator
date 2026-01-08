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
  { id: "lighting" as const, label: "Light" },
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



// Slider component with smooth styling
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  displayValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  displayValue?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded">
          {displayValue ?? value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="slider-smooth w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
      />
    </div>
  );
}

// Toggle component
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
          checked ? "bg-gray-900" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}

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
    <div className="w-96 bg-white rounded-2xl border border-gray-200/50 shadow-lg flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900">3D Text Generator</h1>
        <p className="text-sm text-gray-500 mt-0.5">Create stunning 3D typography</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-3 pt-2 gap-1 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap ${
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
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
              />
              <p className="text-xs text-gray-400 mt-1.5">{textSettings.text.length}/20 characters</p>
            </div>

            <Slider
              label="Font Size"
              value={textSettings.fontSize}
              min={0.3}
              max={2}
              step={0.1}
              onChange={(v) => setTextSettings((prev) => ({ ...prev, fontSize: v }))}
              displayValue={textSettings.fontSize.toFixed(1)}
            />

            <Slider
              label="Depth"
              value={textSettings.depth}
              min={0.1}
              max={1}
              step={0.05}
              onChange={(v) => setTextSettings((prev) => ({ ...prev, depth: v }))}
              displayValue={textSettings.depth.toFixed(2)}
            />

            <Slider
              label="Letter Spacing"
              value={textSettings.letterSpacing}
              min={-0.1}
              max={0.3}
              step={0.01}
              onChange={(v) => setTextSettings((prev) => ({ ...prev, letterSpacing: v }))}
              displayValue={textSettings.letterSpacing.toFixed(2)}
            />

            <Toggle
              label="Bevel"
              checked={textSettings.bevelEnabled}
              onChange={() => setTextSettings((prev) => ({ ...prev, bevelEnabled: !prev.bevelEnabled }))}
            />

            {textSettings.bevelEnabled && (
              <>
                <Slider
                  label="Bevel Thickness"
                  value={textSettings.bevelThickness}
                  min={0.01}
                  max={0.15}
                  step={0.01}
                  onChange={(v) => setTextSettings((prev) => ({ ...prev, bevelThickness: v }))}
                  displayValue={textSettings.bevelThickness.toFixed(2)}
                />

                <Slider
                  label="Bevel Size"
                  value={textSettings.bevelSize}
                  min={0.01}
                  max={0.1}
                  step={0.005}
                  onChange={(v) => setTextSettings((prev) => ({ ...prev, bevelSize: v }))}
                  displayValue={textSettings.bevelSize.toFixed(2)}
                />
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
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    <div
                      className="w-7 h-7 rounded-full border border-gray-200 shadow-sm"
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
                    className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
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
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            <Slider
              label="Roughness"
              value={materialSettings.roughness}
              min={0}
              max={1}
              step={0.05}
              onChange={(v) => setMaterialSettings((prev) => ({ ...prev, roughness: v }))}
              displayValue={materialSettings.roughness.toFixed(2)}
            />

            <Slider
              label="Metalness"
              value={materialSettings.metalness}
              min={0}
              max={1}
              step={0.05}
              onChange={(v) => setMaterialSettings((prev) => ({ ...prev, metalness: v }))}
              displayValue={materialSettings.metalness.toFixed(2)}
            />

            {materialSettings.type === "neon" && (
              <Slider
                label="Glow Intensity"
                value={materialSettings.emissiveIntensity}
                min={0}
                max={5}
                step={0.1}
                onChange={(v) => setMaterialSettings((prev) => ({ ...prev, emissiveIntensity: v }))}
                displayValue={materialSettings.emissiveIntensity.toFixed(1)}
              />
            )}

            {materialSettings.type === "glass" && (
              <Slider
                label="Opacity"
                value={materialSettings.opacity}
                min={0.1}
                max={1}
                step={0.05}
                onChange={(v) => setMaterialSettings((prev) => ({ ...prev, opacity: v }))}
                displayValue={materialSettings.opacity.toFixed(2)}
              />
            )}
          </>
        )}

        {/* Scene Tab */}
        {activeTab === "scene" && (
          <>
            <Toggle
              label="Auto Rotate"
              checked={sceneSettings.autoRotate}
              onChange={() => setSceneSettings((prev) => ({ ...prev, autoRotate: !prev.autoRotate }))}
            />

            {sceneSettings.autoRotate && (
              <Slider
                label="Rotation Speed"
                value={sceneSettings.rotationSpeed}
                min={0.1}
                max={2}
                step={0.1}
                onChange={(v) => setSceneSettings((prev) => ({ ...prev, rotationSpeed: v }))}
                displayValue={sceneSettings.rotationSpeed.toFixed(1)}
              />
            )}

            <Toggle
              label="Gradient Background"
              checked={sceneSettings.backgroundGradient}
              onChange={() => setSceneSettings((prev) => ({ ...prev, backgroundGradient: !prev.backgroundGradient }))}
            />

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
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
            )}

            <Toggle
              label="Show Grid"
              checked={sceneSettings.showGrid}
              onChange={() => setSceneSettings((prev) => ({ ...prev, showGrid: !prev.showGrid }))}
            />

            <Toggle
              label="Show Shadow"
              checked={sceneSettings.showReflection}
              onChange={() => setSceneSettings((prev) => ({ ...prev, showReflection: !prev.showReflection }))}
            />
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
                    className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
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

            <Slider
              label="Ambient Light"
              value={lightingSettings.ambientIntensity}
              min={0}
              max={2}
              step={0.1}
              onChange={(v) => setLightingSettings((prev) => ({ ...prev, ambientIntensity: v }))}
              displayValue={lightingSettings.ambientIntensity.toFixed(1)}
            />

            <Slider
              label="Directional Light"
              value={lightingSettings.directionalIntensity}
              min={0}
              max={3}
              step={0.1}
              onChange={(v) => setLightingSettings((prev) => ({ ...prev, directionalIntensity: v }))}
              displayValue={lightingSettings.directionalIntensity.toFixed(1)}
            />

            <Slider
              label="Light Position X"
              value={lightingSettings.directionalPosition[0]}
              min={-10}
              max={10}
              step={1}
              onChange={(v) =>
                setLightingSettings((prev) => ({
                  ...prev,
                  directionalPosition: [v, prev.directionalPosition[1], prev.directionalPosition[2]],
                }))
              }
              displayValue={String(lightingSettings.directionalPosition[0])}
            />

            <Slider
              label="Light Position Y"
              value={lightingSettings.directionalPosition[1]}
              min={-10}
              max={10}
              step={1}
              onChange={(v) =>
                setLightingSettings((prev) => ({
                  ...prev,
                  directionalPosition: [prev.directionalPosition[0], v, prev.directionalPosition[2]],
                }))
              }
              displayValue={String(lightingSettings.directionalPosition[1])}
            />

            <Slider
              label="Light Position Z"
              value={lightingSettings.directionalPosition[2]}
              min={-10}
              max={10}
              step={1}
              onChange={(v) =>
                setLightingSettings((prev) => ({
                  ...prev,
                  directionalPosition: [prev.directionalPosition[0], prev.directionalPosition[1], v],
                }))
              }
              displayValue={String(lightingSettings.directionalPosition[2])}
            />
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
                  className={`px-4 py-2.5 text-sm rounded-lg border transition-all duration-200 ${
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
                  className={`px-4 py-2.5 text-sm rounded-lg border transition-all duration-200 ${
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
                    className={`px-3 py-2.5 text-sm rounded-lg border transition-all duration-200 ${
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
              <Toggle
                label="Transparent Background"
                checked={exportSettings.transparentBackground}
                onChange={() =>
                  setExportSettings((prev) => ({
                    ...prev,
                    transparentBackground: !prev.transparentBackground,
                  }))
                }
              />
            )}

            <button
              onClick={onExport}
              disabled={isExporting}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          className="w-full py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
        >
          Reset All Settings
        </button>
      </div>

      {/* Custom slider styles */}
      <style jsx global>{`
        .slider-smooth {
          -webkit-appearance: none;
          appearance: none;
          background: linear-gradient(to right, #e5e7eb, #e5e7eb);
          border-radius: 9999px;
          height: 6px;
          outline: none;
          transition: all 0.2s ease;
        }
        
        .slider-smooth:hover {
          background: linear-gradient(to right, #d1d5db, #d1d5db);
        }
        
        .slider-smooth::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #111827;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          transition: all 0.15s ease;
        }
        
        .slider-smooth::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        }
        
        .slider-smooth::-webkit-slider-thumb:active {
          transform: scale(0.95);
        }
        
        .slider-smooth::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #111827;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          transition: all 0.15s ease;
        }
        
        .slider-smooth::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
