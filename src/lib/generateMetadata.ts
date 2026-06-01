import { getPresetById, type Language, type MoodStyle, type Preset, type PresetId, type VideoType } from "@/data/presets";

export type MetadataFormValues = {
  title: string;
  story: string;
  presetId: PresetId;
  videoType: VideoType;
  language: Language;
  mood: MoodStyle;
};

export type GeneratedMetadata = {
  presetName: string;
  videoType: VideoType;
  language: Language;
  titles: string[];
  fullDescription: string;
  shortDescription: string;
  hashtags: string[];
  thumbnailTexts: string[];
  tiktokCaptions: string[];
};

const titlePatterns = [
  "{title} | {keyword}",
  "{title} - {tone} {hook}",
  "{keyword}: {title}",
  "{title} ({languageHook})",
  "{hook} - {storyShort}",
  "{title} | {tone} {videoType}",
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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  return `#${tag.slice(0, 40) || "CreatorVideo"}`;
}

function smartTrim(value: string, maxLength: number): string {
  const clean = value.trim();

  if (clean.length <= maxLength) {
    return clean;
  }

  const trimmed = clean.slice(0, maxLength - 1).trim();
  const lastSpace = trimmed.lastIndexOf(" ");

  return `${(lastSpace > 14 ? trimmed.slice(0, lastSpace) : trimmed).trim()}...`;
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

function localizedCopy(language: Language) {
  if (language === "German") {
    return {
      opener: "Erlebe",
      stylePrefix: "Stil",
      audiencePrefix: "Geeignet fuer",
      cta: "Abonniere den Kanal fuer weitere Uploads, neue Releases und kreative Stories.",
      shortPrefix: "Neu",
    };
  }

  if (language === "Mixed") {
    return {
      opener: "Experience / Erlebe",
      stylePrefix: "Style / Stil",
      audiencePrefix: "Made for / Geeignet fuer",
      cta: "Subscribe und folge dem Kanal fuer more releases, Shorts und neue kreative Uploads.",
      shortPrefix: "New / Neu",
    };
  }

  return {
    opener: "Experience",
    stylePrefix: "Style",
    audiencePrefix: "Made for",
    cta: "Subscribe for more releases, creator drops and new visual stories.",
    shortPrefix: "New",
  };
}

function presetAudienceLine(preset: Preset): string {
  if (preset.source === "custom") {
    return preset.tagline.toLowerCase();
  }

  const presetId = preset.id;

  if (presetId === "neon-hunter-nova") {
    return "fans of cinematic cyberpunk, dark pop, electropop, anime-inspired visuals and game-inspired worlds";
  }

  if (presetId === "nelfij") {
    return "listeners who enjoy emotional anime-inspired, manga-inspired and fanmade original music";
  }

  if (presetId === "bambinibeats") {
    return "kids, parents and families looking for warm learning songs, simple games and sing-along moments";
  }

  return "creators, viewers and fans of clear, useful and engaging online videos";
}

function presetHook(preset: Preset, mood: MoodStyle, keyword: string): string {
  if (preset.id === "neon-hunter-nova") {
    return `${mood} cyberpunk original music`;
  }

  if (preset.id === "nelfij") {
    return `${mood} anime-inspired fanmade music`;
  }

  if (preset.id === "bambinibeats") {
    return "safe kids learning song";
  }

  if (preset.source === "custom") {
    return `${mood} ${keyword}`;
  }

  return `${mood} creator video`;
}

function distinctKeyword(keywords: string[], mood: MoodStyle, index: number): string {
  const keyword = keywords[index % keywords.length];

  if (keyword.toLowerCase() !== mood.toLowerCase()) {
    return keyword;
  }

  return keywords[(index + 1) % keywords.length];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function enforceAvoidWords(text: string, avoidWords: string[] = []): string {
  return avoidWords.reduce((current, word) => {
    const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "gi");
    return current.replace(pattern, "original");
  }, text);
}

export function generateMetadata(values: MetadataFormValues, variant = 0, availablePresets?: Preset[]): GeneratedMetadata {
  const preset = getPresetById(values.presetId, availablePresets);
  const title = cleanInput(values.title, "Untitled Release");
  const story = cleanInput(values.story, "a new creative story");
  const storyShort = smartTrim(story, 48);
  const keywordPool = Array.from(new Set([...(preset.preferredWords ?? []), ...preset.keywords]));
  const keywords = rotate(keywordPool, variant);
  const tones = rotate(preset.toneWords, variant + 1);
  const copy = localizedCopy(values.language);
  const hook = presetHook(preset, values.mood, distinctKeyword(keywords, values.mood, 0));

  const titles = Array.from(new Set(titlePatterns.map((pattern, index) =>
    smartTrim(enforceAvoidWords(
      pattern
        .replace("{title}", title)
        .replace("{mood}", values.mood)
        .replace("{keyword}", distinctKeyword(keywords, values.mood, index))
        .replace("{tone}", tones[index % tones.length])
        .replace("{hook}", hook)
        .replace("{videoType}", values.videoType)
        .replace("{languageHook}", languageHook(values.language))
        .replace("{storyShort}", storyShort),
      preset.avoidWords,
    ), 92),
  ))).slice(0, 5);

  const fullDescription = enforceAvoidWords(
    [
      `${copy.opener} "${title}" - a ${hook} shaped for ${preset.name}.`,
      "",
      `${story} This metadata pack positions the upload clearly for viewers while keeping the channel tone consistent.`,
      "",
      `${copy.stylePrefix}: ${keywords.slice(0, 5).join(", ")}. The wording stays ${tones.slice(0, 3).join(", ")} and focused on the most searchable creator terms.`,
      `${copy.audiencePrefix}: ${presetAudienceLine(preset)}.`,
      `${descriptionLanguageLine(values.language)} Format: ${values.videoType}.`,
      "",
      copy.cta,
      "",
      keywords.slice(0, 5).map(toHashtag).join(" "),
    ].join("\n"),
    preset.avoidWords,
  );

  const shortDescription = smartTrim(
    enforceAvoidWords(`${copy.shortPrefix}: ${hook} - ${title}`, preset.avoidWords),
    99,
  );

  const hashtagSource = [
    title,
    values.videoType,
    values.mood,
    values.language,
    preset.name,
    ...keywords,
  ];

  const hashtags = Array.from(new Set(hashtagSource.map((tag) => toHashtag(enforceAvoidWords(tag, preset.avoidWords)))))
    .filter((tag) => tag.length > 1)
    .slice(0, 10);

  const thumbnailTexts = [
    smartTrim(title, 26),
    smartTrim(`${tones[0].toUpperCase()} ${keywords[0].toUpperCase()}`, 26),
    preset.id === "bambinibeats" || values.videoType === "Kids Song" ? "SING & LEARN" : `${values.mood.toUpperCase()} DROP`,
  ].map((text) => enforceAvoidWords(text, preset.avoidWords));

  const tiktokCaptions = [0, 1, 2].map((offset) =>
    enforceAvoidWords(
      `${pick(captionStarters, variant + offset)} ${title} - ${tones[offset]} ${keywords[offset]}. ${hashtags[offset + 1] ?? hashtags[0]}`,
      preset.avoidWords,
    ),
  );

  return {
    presetName: preset.name,
    videoType: values.videoType,
    language: values.language,
    titles,
    fullDescription,
    shortDescription,
    hashtags,
    thumbnailTexts,
    tiktokCaptions,
  };
}
