"use client";

import { useState, type FormEvent } from "react";
import type { CustomPresetInput } from "@/data/presets";

type CustomPresetFormProps = {
  onCreate: (input: CustomPresetInput) => void;
};

const emptyPreset: CustomPresetInput = {
  name: "",
  description: "",
  toneKeywords: "",
  forbiddenWords: "",
  preferredWords: "",
};

export function CustomPresetForm({ onCreate }: CustomPresetFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<CustomPresetInput>(emptyPreset);

  function update(key: keyof CustomPresetInput, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onCreate(values);
    setValues(emptyPreset);
    setIsOpen(false);
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-stone-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-stone-950">Custom presets</h2>
          <p className="mt-1 text-xs leading-5 text-stone-600">Saved locally in this browser.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="min-h-9 rounded-md border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-teal-700 hover:text-teal-800"
        >
          {isOpen ? "Close" : "Add preset"}
        </button>
      </div>

      {isOpen ? (
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <TextInput
            label="Preset name"
            value={values.name}
            onChange={(value) => update("name", value)}
            placeholder="My Music Channel"
            required
          />
          <TextInput
            label="Description"
            value={values.description}
            onChange={(value) => update("description", value)}
            placeholder="Emotional synthwave music for night drive visuals."
          />
          <TextInput
            label="Tone keywords"
            value={values.toneKeywords}
            onChange={(value) => update("toneKeywords", value)}
            placeholder="warm, cinematic, hopeful"
          />
          <TextInput
            label="Preferred words"
            value={values.preferredWords}
            onChange={(value) => update("preferredWords", value)}
            placeholder="original music, synthwave, night drive"
          />
          <TextInput
            label="Forbidden words"
            value={values.forbiddenWords}
            onChange={(value) => update("forbiddenWords", value)}
            placeholder="AI, clickbait"
          />
          <button
            type="submit"
            className="min-h-10 rounded-lg bg-stone-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-stone-700"
          >
            Save custom preset
          </button>
        </form>
      ) : null}
    </section>
  );
}

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
};

function TextInput({ label, value, onChange, placeholder, required = false }: TextInputProps) {
  const id = label.toLowerCase().replace(/\W+/g, "-");

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-xs font-semibold text-stone-800">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-950 outline-none placeholder:text-stone-400 focus:border-teal-800 focus:ring-2 focus:ring-teal-700/20"
      />
    </div>
  );
}
