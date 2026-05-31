export type PresetId =
  | "neon-hunter-nova"
  | "nelfij"
  | "bambinibeats"
  | "generic-creator";

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
  avoidWords?: string[];
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
    avoidWords: ["AI", "KI"],
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

export function getPresetById(id: PresetId): Preset {
  return presets.find((preset) => preset.id === id) ?? presets[0];
}
