import type { GeneratedMetadata, MetadataFormValues } from "@/lib/generateMetadata";

export const generationHistoryStorageKey = "yt-metadata-studio-generation-history";
export const generationHistoryLimit = 10;

export type GenerationHistoryItem = {
  id: string;
  createdAt: string;
  values: MetadataFormValues;
  metadata: GeneratedMetadata;
};

export function createHistoryItem(
  values: MetadataFormValues,
  metadata: GeneratedMetadata,
): GenerationHistoryItem {
  return {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    values,
    metadata,
  };
}

export function addHistoryItem(
  history: GenerationHistoryItem[],
  item: GenerationHistoryItem,
): GenerationHistoryItem[] {
  return [item, ...history].slice(0, generationHistoryLimit);
}
