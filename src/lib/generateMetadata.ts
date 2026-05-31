import { getPresetById, type Language, type MoodStyle, type PresetId, type VideoType } from "@/data/presets";

export type MetadataFormValues = {
  title: string;
  story: string;
  presetId: PresetId;
  videoType: VideoType;
  language: Language;
  mood: MoodStyle;
};

export type GeneratedMetadata = {
  titles: string[];
  fullDescription: string;
  shortDescription: string;
  hashtags: string[];
  thumbnailTexts: string[];
  tiktokCaptions: string[];
};

const titlePatterns = [
  "{title} | {mood} {keyword}",
  "{title} - {tone} {videoType}",
  "{keyword}: {title}",
  "{title} ({languageHook})",
  "{tone} {keyword} for {storyShort}",
];

const descriptionOpeners = [
  "Step into",
  "Experience",
  "Discover",
  "Enter",
  "Watch",
];

const ctas = [
  "Subscribe for more releases, creator drops and new visual stories.",
  "Like, comment and follow the channel for the next upload.",
  "Save this video if the mood fits your playlist or project inspiration.",
  "Share it with someone who would connect with this style.",
];

const captionStarters = [
  "New drop:",
  "This one is for the mood:",
  "Built around this feeling:",
  "Quick scene:",
  "Save this vibe:",
];

function cleanInput(value: string, fallback: string): string {
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed.length > 0 ? trimmed : fallback;
}

function pick<T>(items: T[], seed: number): T {
  return items[Math.abs(seed) % items.length];
}

function rotate<T>(items: T[], seed: number): T[] {
  return items.map((_, index) => items[(index + seed) % items.length]);
}

function toHashtag(value: string): string {
  const tag = value
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  return `#${tag || "CreatorVideo"}`;
}

function languageHook(language: Language): string {
  if (language === "German") {
    return "Deutsch";
  }

  if (language === "Mixed") {
    return "English/German";
  }

  return "Official Video";
}

function descriptionLanguageLine(language: Language): string {
  if (language === "German") {
    return "Sprache: Deutsch.";
  }

  if (language === "Mixed") {
    return "Language: mixed English and German wording.";
  }

  return "Language: English.";
}

function distinctKeyword(keywords: string[], mood: MoodStyle, index: number): string {
  const keyword = keywords[index % keywords.length];

  if (keyword.toLowerCase() !== mood.toLowerCase()) {
    return keyword;
  }

  return keywords[(index + 1) % keywords.length];
}

function enforceAvoidWords(text: string, avoidWords: string[] = []): string {
  return avoidWords.reduce((current, word) => {
    const pattern = new RegExp(`\\b${word}\\b`, "gi");
    return current.replace(pattern, "original");
  }, text);
}

export function generateMetadata(values: MetadataFormValues, variant = 0): GeneratedMetadata {
  const preset = getPresetById(values.presetId);
  const title = cleanInput(values.title, "Untitled Release");
  const story = cleanInput(values.story, "a new creative story");
  const storyShort = story.length > 44 ? `${story.slice(0, 41).trim()}...` : story;
  const keywords = rotate(preset.keywords, variant);
  const tones = rotate(preset.toneWords, variant + 1);
  const opener = pick(descriptionOpeners, variant);
  const cta = pick(ctas, variant + values.videoType.length);

  const titles = titlePatterns.map((pattern, index) =>
    enforceAvoidWords(
      pattern
        .replace("{title}", title)
        .replace("{mood}", values.mood)
        .replace("{keyword}", distinctKeyword(keywords, values.mood, index))
        .replace("{tone}", tones[index % tones.length])
        .replace("{videoType}", values.videoType)
        .replace("{languageHook}", languageHook(values.language))
        .replace("{storyShort}", storyShort),
      preset.avoidWords,
    ),
  );

  const fullDescription = enforceAvoidWords(
    [
      `${opener} "${title}", a ${values.mood} ${values.videoType.toLowerCase()} shaped for ${preset.name}.`,
      "",
      `${story}`,
      "",
      `Style notes: ${keywords.slice(0, 5).join(", ")}. The wording keeps the upload ${tones.slice(0, 3).join(", ")} and aligned with the channel preset.`,
      `${descriptionLanguageLine(values.language)} Format: ${values.videoType}.`,
      "",
      cta,
    ].join("\n"),
    preset.avoidWords,
  );

  const shortDescription = enforceAvoidWords(
    `${values.mood} ${distinctKeyword(keywords, values.mood, 0)}: ${title}`.slice(0, 99),
    preset.avoidWords,
  );

  const hashtagSource = [
    title,
    values.videoType,
    values.mood,
    values.language,
    preset.name,
    ...keywords,
  ];

  const hashtags = Array.from(new Set(hashtagSource.map(toHashtag))).slice(0, 10);

  const thumbnailTexts = [
    title.length <= 24 ? title : title.split(" ").slice(0, 4).join(" "),
    `${tones[0].toUpperCase()} ${keywords[0].toUpperCase()}`,
    values.videoType === "Kids Song" ? "SING & LEARN" : `${values.mood.toUpperCase()} DROP`,
  ].map((text) => enforceAvoidWords(text, preset.avoidWords));

  const tiktokCaptions = [0, 1, 2].map((offset) =>
    enforceAvoidWords(
      `${pick(captionStarters, variant + offset)} ${title} - ${tones[offset]} ${keywords[offset]}. ${hashtags[offset + 1] ?? hashtags[0]}`,
      preset.avoidWords,
    ),
  );

  return {
    titles,
    fullDescription,
    shortDescription,
    hashtags,
    thumbnailTexts,
    tiktokCaptions,
  };
}
