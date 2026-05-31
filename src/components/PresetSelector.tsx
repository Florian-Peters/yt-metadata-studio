import { presets, type PresetId } from "@/data/presets";

type PresetSelectorProps = {
  value: PresetId;
  onChange: (value: PresetId) => void;
};

export function PresetSelector({ value, onChange }: PresetSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-stone-900">Channel preset</label>
      <div className="grid gap-3">
        {presets.map((preset) => {
          const selected = preset.id === value;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.id)}
              className={`rounded-lg border p-4 text-left transition ${
                selected
                  ? "border-teal-800 bg-teal-950 text-white shadow-md"
                  : "border-stone-200 bg-white text-stone-900 hover:border-teal-700"
              }`}
            >
              <span className="block text-sm font-bold">{preset.name}</span>
              <span className={`mt-1 block text-xs leading-5 ${selected ? "text-teal-50" : "text-stone-600"}`}>
                {preset.tagline}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
