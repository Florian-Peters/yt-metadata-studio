import type { GeneratedMetadata, MetadataFormValues } from "@/lib/generateMetadata";

export type MetadataScore = {
  score: number;
  tips: string[];
};

export function scoreMetadata(metadata: GeneratedMetadata, values: MetadataFormValues): MetadataScore {
  const primaryTitle = metadata.titles[0] ?? "";
  const descriptionLength = metadata.fullDescription.length;
  const mood = values.mood.toLowerCase();
  const searchableText = [
    ...metadata.titles,
    metadata.fullDescription,
    metadata.shortDescription,
    ...metadata.hashtags,
  ].join(" ").toLowerCase();

  let score = 0;
  const tips: string[] = [];

  if (primaryTitle.length >= 35 && primaryTitle.length <= 75) {
    score += 20;
  } else {
    tips.push("Keep the strongest title roughly between 35 and 75 characters.");
    score += primaryTitle.length > 0 ? 10 : 0;
  }

  if (descriptionLength >= 220 && descriptionLength <= 1200) {
    score += 25;
  } else {
    tips.push("Add a useful description with context, style and audience details.");
    score += descriptionLength > 120 ? 15 : 5;
  }

  if (metadata.hashtags.length === 10) {
    score += 20;
  } else {
    tips.push("Use 10 focused hashtags for this metadata pack.");
    score += Math.min(metadata.hashtags.length * 2, 16);
  }

  if (metadata.shortDescription.length <= 99) {
    score += 15;
  } else {
    tips.push("Keep the short description under 100 characters.");
  }

  if (searchableText.includes(mood)) {
    score += 10;
  } else {
    tips.push(`Include the mood/style keyword "${values.mood}" in the output.`);
  }

  if (metadata.thumbnailTexts.length >= 3 && metadata.tiktokCaptions.length >= 3) {
    score += 10;
  } else {
    tips.push("Include thumbnail text and short-form captions.");
  }

  return {
    score: Math.min(score, 100),
    tips: tips.slice(0, 3),
  };
}
