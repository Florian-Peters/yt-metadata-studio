"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { MetadataForm } from "@/components/MetadataForm";
import { OutputCard } from "@/components/OutputCard";
import { getPresetById } from "@/data/presets";
import { generateMetadata, type GeneratedMetadata, type MetadataFormValues } from "@/lib/generateMetadata";

const initialValues: MetadataFormValues = {
  title: "",
  story: "",
  presetId: "neon-hunter-nova",
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
  const selectedPreset = useMemo(() => getPresetById(values.presetId), [values.presetId]);

  function handleGenerate() {
    const next = generateMetadata(values, variant);
    setMetadata(next);
  }

  function handleRegenerate() {
    const nextVariant = variant + 1;
    setVariant(nextVariant);
    setMetadata(generateMetadata(values, nextVariant));
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
          {metadata ? <CopyButton text={formatAll(metadata)} label="Copy All" className="sm:min-w-32" /> : null}
        </header>

        <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          <aside className="rounded-lg border border-stone-200 bg-white/90 p-5 shadow-sm backdrop-blur">
            <MetadataForm
              values={values}
              onChange={setValues}
              onGenerate={handleGenerate}
              onRegenerate={handleRegenerate}
              hasOutput={Boolean(metadata)}
            />
          </aside>

          <section className="min-h-[620px] rounded-lg border border-stone-200 bg-white/70 p-5 shadow-sm backdrop-blur">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-stone-950">Generated output</h2>
                <p className="text-sm leading-6 text-stone-700">
                  Active preset: <span className="font-semibold text-teal-900">{selectedPreset.name}</span>
                </p>
              </div>
              <span className="w-fit rounded-md bg-stone-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                Local only
              </span>
            </div>

            {metadata ? (
              <div className="grid gap-4">
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
