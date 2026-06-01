export type BuiltInPresetId =
  | "neon-hunter-nova"
  | "nelfij"
  | "bambinibeats"
  | "generic-creator";

export type PresetId = BuiltInPresetId | `custom-${string}`;

export type VideoType =
  | "Long Video"
  | "Short"
  | "TikTok"
  | "Kids Song"
  | "Music Video";

export type Language = "English" | "German" | "Mixed";

export type MoodStyle =
  | "cinematic"
  | "emotional"
  | "funny"
  | "epic"
  | "dark"
  | "kid-friendly";

export type Preset = {
  id: PresetId;
  name: string;
  tagline: string;
  rules: string[];
  keywords: string[];
  toneWords: string[];
  preferredWords?: string[];
  avoidWords?: string[];
  source: "built-in" | "custom";
};

export type CustomPresetInput = {
  name: string;
  description: string;
  toneKeywords: string;
  forbiddenWords: string;
  preferredWords: string;
};

export const presets: Preset[] = [
  {
    id: "neon-hunter-nova",
    name: "Neon Hunter Nova",
    tagline: "Cinematic cyberpunk music metadata for futuristic releases.",
    rules: [
      "Do not use the words AI or KI in public metadata.",
      "Use words like cinematic, cyberpunk, dark pop, electropop, futuristic music, original music.",
      "Suitable for music, anime-inspired, game-inspired and cinematic uploads.",
    ],
    keywords: [
      "cinematic",
      "cyberpunk",
      "dark pop",
      "electropop",
      "futuristic music",
      "original music",
      "anime-inspired",
      "game-inspired",
    ],
    toneWords: ["neon-lit", "futuristic", "shadowy", "high-energy", "cinematic"],
    preferredWords: ["cinematic", "cyberpunk", "dark pop", "electropop", "original music"],
    avoidWords: ["AI", "KI"],
    source: "built-in",
  },
  {
    id: "nelfij",
    name: "Nelfij",
    tagline: "Emotional anime-inspired music metadata with fanmade energy.",
    rules: [
      "Manga/anime-inspired music project.",
      "Good for One-Piece-inspired fanmade music.",
      "Use strong emotional and cinematic wording.",
      "Add fanmade/original music wording where fitting.",
    ],
    keywords: [
      "anime-inspired",
      "manga-inspired",
      "fanmade music",
      "original music",
      "cinematic",
      "emotional",
      "adventure",
      "battle theme",
    ],
    toneWords: ["emotional", "adventurous", "cinematic", "heroic", "heartfelt"],
    preferredWords: ["fanmade", "original music", "anime-inspired", "cinematic", "emotional"],
    source: "built-in",
  },
  {
    id: "bambinibeats",
    name: "BambiniBeats",
    tagline: "Warm, safe metadata for kids songs and learning videos.",
    rules: [
      "Child-friendly.",
      "Learning music, numbers, letters, games, multilingual content.",
      "Simple, warm, safe wording.",
      "Suitable for kids and parents.",
    ],
    keywords: [
      "kids song",
      "learning music",
      "numbers",
      "letters",
      "games",
      "multilingual",
      "family friendly",
      "sing along",
    ],
    toneWords: ["warm", "simple", "playful", "safe", "cheerful"],
    preferredWords: ["kids song", "learning", "sing along", "family friendly", "numbers"],
    avoidWords: ["scary", "violent", "dark", "horror"],
    source: "built-in",
  },
  {
    id: "generic-creator",
    name: "Generic Creator",
    tagline: "Neutral creator metadata for videos, music, tutorials and socials.",
    rules: [
      "Neutral creator wording.",
      "Useful for gaming, music, tutorials, shorts and social media.",
    ],
    keywords: [
      "creator",
      "new video",
      "behind the scenes",
      "shorts",
      "tutorial",
      "gaming",
      "music",
      "social media",
    ],
    toneWords: ["clear", "engaging", "modern", "direct", "useful"],
    preferredWords: ["new video", "creator", "shorts", "tutorial", "music"],
    source: "built-in",
  },
];

export const videoTypes: VideoType[] = [
  "Long Video",
  "Short",
  "TikTok",
  "Kids Song",
  "Music Video",
];

export const languages: Language[] = ["English", "German", "Mixed"];

export const moodStyles: MoodStyle[] = [
  "cinematic",
  "emotional",
  "funny",
  "epic",
  "dark",
  "kid-friendly",
];

export function getPresetById(id: PresetId, availablePresets: Preset[] = presets): Preset {
  return availablePresets.find((preset) => preset.id === id) ?? availablePresets[0] ?? presets[0];
}

export function parsePresetWords(value: string): string[] {
  return value
    .split(/[,;\n]/)
    .map((word) => word.trim())
    .filter(Boolean);
}

export function createCustomPreset(input: CustomPresetInput): Preset {
  const name = input.name.trim() || "Custom Preset";
  const toneWords = parsePresetWords(input.toneKeywords);
  const preferredWords = parsePresetWords(input.preferredWords);
  const avoidWords = parsePresetWords(input.forbiddenWords);

  return {
    id: `custom-${Date.now().toString(36)}`,
    name,
    tagline: input.description.trim() || "Custom local creator preset.",
    rules: [
      input.description.trim() || "Use the creator's custom channel wording.",
      preferredWords.length > 0 ? `Prefer: ${preferredWords.join(", ")}.` : "Use clear creator-friendly wording.",
      avoidWords.length > 0 ? `Avoid: ${avoidWords.join(", ")}.` : "Avoid misleading or off-brand wording.",
    ],
    keywords: preferredWords.length > 0 ? preferredWords : ["creator", "new video", "original content"],
    toneWords: toneWords.length > 0 ? toneWords : ["clear", "consistent", "engaging"],
    preferredWords,
    avoidWords,
    source: "custom",
  };
}
