"use client";

import { languages, moodStyles, videoTypes, type Preset, type PresetId } from "@/data/presets";
import type { MetadataFormValues } from "@/lib/generateMetadata";
import { PresetSelector } from "@/components/PresetSelector";

type MetadataFormProps = {
  values: MetadataFormValues;
  onChange: (values: MetadataFormValues) => void;
  onGenerate: () => void;
  onRegenerate: () => void;
  presets: Preset[];
  onDeleteCustomPreset: (value: PresetId) => void;
  hasOutput: boolean;
};

export function MetadataForm({
  values,
  onChange,
  onGenerate,
  onRegenerate,
  presets,
  onDeleteCustomPreset,
  hasOutput,
}: MetadataFormProps) {
  function update<K extends keyof MetadataFormValues>(key: K, value: MetadataFormValues[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onGenerate();
      }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-semibold text-stone-900">
          Video or song title
        </label>
        <input
          id="title"
          value={values.title}
          onChange={(event) => update("title", event.target.value)}
          placeholder="Midnight Skyline"
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-teal-800 focus:ring-2 focus:ring-teal-700/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="story" className="text-sm font-semibold text-stone-900">
          Main topic or story
        </label>
        <textarea
          id="story"
          value={values.story}
          onChange={(event) => update("story", event.target.value)}
          placeholder="A cinematic upload about a rainy night drive with emotional synth melodies."
          rows={5}
          className="w-full resize-none rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-teal-800 focus:ring-2 focus:ring-teal-700/20"
        />
      </div>

      <PresetSelector
        value={values.presetId}
        presets={presets}
        onChange={(presetId: PresetId) => update("presetId", presetId)}
        onDeleteCustomPreset={onDeleteCustomPreset}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Video type"
          value={values.videoType}
          options={videoTypes}
          onChange={(value) => update("videoType", value)}
        />
        <SelectField
          label="Language"
          value={values.language}
          options={languages}
          onChange={(value) => update("language", value)}
        />
      </div>

      <SelectField
        label="Mood/style"
        value={values.mood}
        options={moodStyles}
        onChange={(value) => update("mood", value)}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="min-h-11 flex-1 rounded-lg bg-teal-800 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2"
        >
          Generate metadata
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          disabled={!hasOutput}
          className="min-h-11 flex-1 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-stone-900 shadow-sm transition hover:border-teal-800 hover:text-teal-900 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Regenerate
        </button>
      </div>
    </form>
  );
}

type SelectFieldProps<T extends string> = {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
};

function SelectField<T extends string>({ label, value, options, onChange }: SelectFieldProps<T>) {
  const id = label.toLowerCase().replace(/\W+/g, "-");

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-stone-900">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-950 outline-none transition focus:border-teal-800 focus:ring-2 focus:ring-teal-700/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
