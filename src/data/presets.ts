export type BuiltInPresetId =
  | "cinematic-music-artist"
  | "anime-fanmade-music"
  | "kids-learning-channel"
  | "gaming-creator"
  | "tutorial-education"
  | "podcast-interview"
  | "fitness-creator"
  | "business-product"
  | "shorts-tiktok-viral"
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
    id: "cinematic-music-artist",
    name: "Cinematic Music Artist",
    tagline: "Cinematic music metadata for original artist releases and visual music videos.",
    rules: [
      "Do not use the words AI or KI in public metadata.",
      "Use words like cinematic, cyberpunk, dark pop, electropop, futuristic music, original music.",
      "Suitable for music artists, cinematic uploads, visualizers and music videos.",
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
    id: "anime-fanmade-music",
    name: "Anime / Fanmade Music",
    tagline: "Emotional anime-inspired music metadata with fanmade energy.",
    rules: [
      "Good for anime-inspired and manga-inspired music projects.",
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
    id: "kids-learning-channel",
    name: "Kids Learning Channel",
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
    id: "gaming-creator",
    name: "Gaming Creator",
    tagline: "Metadata for gameplay, walkthroughs, highlights and gaming reactions.",
    rules: [
      "For gaming videos, walkthroughs, highlights, boss fights, reactions and game music.",
      "Use clear game-focused wording with energy and searchable terms.",
      "Make the upload useful for players, fans and viewers looking for specific moments.",
    ],
    keywords: [
      "gaming",
      "gameplay",
      "walkthrough",
      "highlights",
      "boss fight",
      "reaction",
      "game music",
      "playthrough",
    ],
    toneWords: ["high-energy", "focused", "epic", "competitive", "entertaining"],
    preferredWords: ["gameplay", "walkthrough", "highlights", "boss fight", "reaction"],
    source: "built-in",
  },
  {
    id: "tutorial-education",
    name: "Tutorial / Education",
    tagline: "Clear, helpful metadata for tutorials, lessons and learning content.",
    rules: [
      "Use clear, helpful, searchable wording for learning content.",
      "Explain the practical outcome or skill viewers will learn.",
      "Keep titles direct and descriptions structured.",
    ],
    keywords: [
      "tutorial",
      "education",
      "how to",
      "learn",
      "step by step",
      "guide",
      "beginner friendly",
      "explainer",
    ],
    toneWords: ["clear", "helpful", "practical", "structured", "beginner-friendly"],
    preferredWords: ["tutorial", "how to", "step by step", "guide", "learn"],
    source: "built-in",
  },
  {
    id: "podcast-interview",
    name: "Podcast / Interview",
    tagline: "Metadata for podcast episodes, clips, guest conversations and topic breakdowns.",
    rules: [
      "Good for conversations, clips, guests, topics and episode descriptions.",
      "Highlight the guest, theme or strongest discussion angle.",
      "Make clips easy to understand without overhyping.",
    ],
    keywords: [
      "podcast",
      "interview",
      "conversation",
      "episode",
      "guest",
      "clip",
      "discussion",
      "insights",
    ],
    toneWords: ["thoughtful", "clear", "engaging", "conversational", "insightful"],
    preferredWords: ["podcast", "interview", "guest", "episode", "conversation"],
    source: "built-in",
  },
  {
    id: "fitness-creator",
    name: "Fitness Creator",
    tagline: "Metadata for workouts, routines, calisthenics and progress content.",
    rules: [
      "Good for workouts, calisthenics, progress, routines and health-related creator content.",
      "Use motivating wording without unsafe medical promises.",
      "Keep descriptions practical, safe and routine-focused.",
    ],
    keywords: [
      "fitness",
      "workout",
      "routine",
      "calisthenics",
      "progress",
      "training",
      "mobility",
      "healthy habits",
    ],
    toneWords: ["motivating", "practical", "strong", "focused", "safe"],
    preferredWords: ["workout", "routine", "training", "progress", "fitness"],
    avoidWords: ["cure", "guaranteed results", "medical advice"],
    source: "built-in",
  },
  {
    id: "business-product",
    name: "Business / Product",
    tagline: "Metadata for demos, launches, SaaS tools, startup updates and explainers.",
    rules: [
      "Good for product demos, startup updates, SaaS tools, launches and explainers.",
      "Use specific value-focused wording and clear audience benefits.",
      "Keep claims grounded and professional.",
    ],
    keywords: [
      "product demo",
      "startup",
      "SaaS",
      "launch",
      "explainer",
      "business",
      "workflow",
      "tool",
    ],
    toneWords: ["professional", "clear", "useful", "focused", "practical"],
    preferredWords: ["product demo", "SaaS", "launch", "explainer", "workflow"],
    source: "built-in",
  },
  {
    id: "shorts-tiktok-viral",
    name: "Shorts / TikTok Viral",
    tagline: "Punchy metadata for short-form videos, Reels, Shorts and TikTok clips.",
    rules: [
      "Use short, punchy, high-retention wording for Shorts, Reels and TikTok.",
      "Lead with the hook, mood or payoff.",
      "Keep captions quick, scannable and platform-friendly.",
    ],
    keywords: [
      "shorts",
      "TikTok",
      "viral",
      "quick clip",
      "trending",
      "reels",
      "short form",
      "watch till the end",
    ],
    toneWords: ["punchy", "fast", "scroll-stopping", "catchy", "high-retention"],
    preferredWords: ["shorts", "TikTok", "viral", "quick clip", "trending"],
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
