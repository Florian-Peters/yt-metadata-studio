import type { Preset, PresetId } from "@/data/presets";

type PresetSelectorProps = {
  value: PresetId;
  presets: Preset[];
  onChange: (value: PresetId) => void;
  onDeleteCustomPreset: (value: PresetId) => void;
};

export function PresetSelector({ value, presets, onChange, onDeleteCustomPreset }: PresetSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-stone-900">Channel preset</label>
      <div className="grid gap-3">
        {presets.map((preset) => {
          const selected = preset.id === value;

          return (
            <div
              key={preset.id}
              className={`rounded-lg border p-4 text-left transition ${
                selected
                  ? "border-teal-800 bg-teal-950 text-white shadow-md"
                  : "border-stone-200 bg-white text-stone-900 hover:border-teal-700"
              }`}
            >
              <button type="button" onClick={() => onChange(preset.id)} className="w-full text-left">
                <span className="block text-sm font-bold">{preset.name}</span>
                <span className={`mt-1 block text-xs leading-5 ${selected ? "text-teal-50" : "text-stone-600"}`}>
                  {preset.tagline}
                </span>
              </button>
              <span className={`mt-1 block text-xs leading-5 ${selected ? "text-teal-50" : "text-stone-600"}`}>
                {preset.source === "custom" ? "Custom preset" : "Built-in preset"}
              </span>
              {preset.source === "custom" ? (
                <button
                  type="button"
                  onClick={() => onDeleteCustomPreset(preset.id)}
                  className={`mt-3 rounded-md border px-2 py-1 text-xs font-semibold transition ${
                    selected
                      ? "border-teal-200 text-teal-50 hover:bg-teal-900"
                      : "border-stone-300 text-stone-700 hover:border-rose-400 hover:text-rose-700"
                  }`}
                >
                  Delete
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
