"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { CustomPresetForm } from "@/components/CustomPresetForm";
import { MetadataForm } from "@/components/MetadataForm";
import { MetadataScoreCard } from "@/components/MetadataScoreCard";
import { OutputCard } from "@/components/OutputCard";
import { createCustomPreset, getPresetById, presets as builtInPresets, type CustomPresetInput, type Preset, type PresetId } from "@/data/presets";
import { downloadTextFile, formatMetadataAsMarkdown, formatMetadataAsText, metadataFilename } from "@/lib/exportMetadata";
import { generateMetadata, type GeneratedMetadata, type MetadataFormValues } from "@/lib/generateMetadata";
import { scoreMetadata } from "@/lib/scoreMetadata";

const customPresetsStorageKey = "yt-metadata-studio-custom-presets";

const initialValues: MetadataFormValues = {
  title: "",
  story: "",
  presetId: "cinematic-music-artist",
  videoType: "Music Video",
  language: "English",
  mood: "cinematic",
};

function formatAll(metadata: GeneratedMetadata): string {
  return [
    "YouTube title ideas",
    ...metadata.titles.map((title, index) => `${index + 1}. ${title}`),
    "",
    "Full YouTube description",
    metadata.fullDescription,
    "",
    "Short YouTube description",
    metadata.shortDescription,
    "",
    "Hashtags",
    metadata.hashtags.join(" "),
    "",
    "Thumbnail text ideas",
    ...metadata.thumbnailTexts.map((text, index) => `${index + 1}. ${text}`),
    "",
    "TikTok caption ideas",
    ...metadata.tiktokCaptions.map((caption, index) => `${index + 1}. ${caption}`),
  ].join("\n");
}

export default function Home() {
  const [values, setValues] = useState<MetadataFormValues>(initialValues);
  const [variant, setVariant] = useState(0);
  const [metadata, setMetadata] = useState<GeneratedMetadata | null>(null);
  const [generatedValues, setGeneratedValues] = useState<MetadataFormValues>(initialValues);
  const [customPresets, setCustomPresets] = useState<Preset[]>([]);
  const allPresets = useMemo(() => [...builtInPresets, ...customPresets], [customPresets]);
  const selectedPreset = useMemo(() => getPresetById(values.presetId, allPresets), [allPresets, values.presetId]);
  const metadataScore = useMemo(() => (metadata ? scoreMetadata(metadata, generatedValues) : null), [generatedValues, metadata]);

  useEffect(() => {
    const saved = window.localStorage.getItem(customPresetsStorageKey);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Preset[];
      setCustomPresets(parsed.filter((preset) => preset.source === "custom"));
    } catch {
      window.localStorage.removeItem(customPresetsStorageKey);
    }
  }, []);

  function handleGenerate() {
    const next = generateMetadata(values, variant, allPresets);
    setMetadata(next);
    setGeneratedValues(values);
  }

  function handleRegenerate() {
    const nextVariant = variant + 1;
    setVariant(nextVariant);
    setMetadata(generateMetadata(values, nextVariant, allPresets));
    setGeneratedValues(values);
  }

  function handleCreateCustomPreset(input: CustomPresetInput) {
    const preset = createCustomPreset(input);
    setCustomPresets((current) => {
      const next = [...current, preset];
      window.localStorage.setItem(customPresetsStorageKey, JSON.stringify(next));
      return next;
    });
    setValues((current) => ({ ...current, presetId: preset.id }));
  }

  function handleDeleteCustomPreset(presetId: PresetId) {
    setCustomPresets((current) => {
      const next = current.filter((preset) => preset.id !== presetId);
      window.localStorage.setItem(customPresetsStorageKey, JSON.stringify(next));
      return next;
    });

    if (values.presetId === presetId) {
      setValues((current) => ({ ...current, presetId: "generic-creator" }));
    }
  }

  function handleExport(format: "txt" | "md") {
    if (!metadata) {
      return;
    }

    const title = generatedValues.title || "untitled-release";
    const content = format === "txt" ? formatMetadataAsText(metadata) : formatMetadataAsMarkdown(metadata, generatedValues);
    const mimeType = format === "txt" ? "text/plain;charset=utf-8" : "text/markdown;charset=utf-8";
    downloadTextFile(metadataFilename(title, format), content, mimeType);
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 rounded-lg border border-stone-200 bg-white/80 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-800">Creator metadata studio</p>
            <h1 className="mt-2 text-3xl font-black text-stone-950 sm:text-4xl">yt-metadata-studio</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-700">
              Generate reusable YouTube titles, descriptions, hashtags, captions and thumbnail text from channel presets.
            </p>
          </div>
          {metadata ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <CopyButton text={formatAll(metadata)} label="Copy All" className="sm:min-w-28" />
              <button
                type="button"
                onClick={() => handleExport("txt")}
                className="min-h-9 rounded-md border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-teal-700 hover:text-teal-800"
              >
                Export as TXT
              </button>
              <button
                type="button"
                onClick={() => handleExport("md")}
                className="min-h-9 rounded-md border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-teal-700 hover:text-teal-800"
              >
                Export as Markdown
              </button>
            </div>
          ) : null}
        </header>

        <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          <aside className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm backdrop-blur">
            <MetadataForm
              values={values}
              onChange={setValues}
              onGenerate={handleGenerate}
              onRegenerate={handleRegenerate}
              presets={allPresets}
              onDeleteCustomPreset={handleDeleteCustomPreset}
              hasOutput={Boolean(metadata)}
            />
            <div className="mt-6">
              <CustomPresetForm onCreate={handleCreateCustomPreset} />
            </div>
          </aside>

          <section className="min-h-[620px] rounded-lg border border-stone-200 bg-white/70 p-5 shadow-sm backdrop-blur">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-stone-950">Generated output</h2>
                <p className="text-sm leading-6 text-stone-700">
                  Selected preset: <span className="font-semibold text-teal-900">{selectedPreset.name}</span>
                </p>
                {metadata ? (
                  <p className="text-sm leading-6 text-stone-600">
                    Output generated for:{" "}
                    <span className="font-semibold">
                      {metadata.presetName} / {metadata.videoType} / {metadata.language}
                    </span>
                  </p>
                ) : null}
              </div>
              <span className="w-fit rounded-md bg-stone-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                Local only
              </span>
            </div>

            {metadata ? (
              <div className="grid gap-4">
                {metadataScore ? <MetadataScoreCard score={metadataScore} /> : null}
                <OutputCard title="5 YouTube title ideas" content={metadata.titles} />
                <OutputCard title="Full YouTube description" content={metadata.fullDescription} />
                <OutputCard title="Short YouTube description under 100 characters" content={metadata.shortDescription} />
                <OutputCard title="10 hashtags" content={metadata.hashtags} />
                <OutputCard title="3 thumbnail text ideas" content={metadata.thumbnailTexts} />
                <OutputCard title="3 TikTok caption ideas" content={metadata.tiktokCaptions} />
              </div>
            ) : (
              <div className="flex min-h-[480px] items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50/70 p-8 text-center">
                <div className="max-w-md">
                  <p className="text-lg font-black text-stone-950">No metadata generated yet</p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    Fill in the creative details, choose a preset, then generate a complete metadata pack for YouTube,
                    Shorts and TikTok.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
