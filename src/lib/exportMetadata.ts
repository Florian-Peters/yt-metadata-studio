import type { GeneratedMetadata, MetadataFormValues } from "@/lib/generateMetadata";

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "untitled-release";
}

export function metadataFilename(title: string, extension: "txt" | "md"): string {
  return `yt-metadata-${slugify(title)}.${extension}`;
}

export function formatMetadataAsText(metadata: GeneratedMetadata): string {
  return [
    "YT Metadata Studio Export",
    `Preset: ${metadata.presetName}`,
    `Video type: ${metadata.videoType}`,
    `Language: ${metadata.language}`,
    "",
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

export function formatMetadataAsMarkdown(metadata: GeneratedMetadata, values: MetadataFormValues): string {
  return [
    `# ${values.title.trim() || "Untitled Release"} Metadata`,
    "",
    `- Preset: ${metadata.presetName}`,
    `- Video type: ${metadata.videoType}`,
    `- Language: ${metadata.language}`,
    "",
    "## YouTube Title Ideas",
    ...metadata.titles.map((title, index) => `${index + 1}. ${title}`),
    "",
    "## Full YouTube Description",
    "",
    metadata.fullDescription,
    "",
    "## Short YouTube Description",
    "",
    metadata.shortDescription,
    "",
    "## Hashtags",
    "",
    metadata.hashtags.join(" "),
    "",
    "## Thumbnail Text Ideas",
    ...metadata.thumbnailTexts.map((text) => `- ${text}`),
    "",
    "## TikTok Caption Ideas",
    ...metadata.tiktokCaptions.map((caption) => `- ${caption}`),
  ].join("\n");
}

export function downloadTextFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
