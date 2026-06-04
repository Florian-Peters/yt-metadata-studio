import type { GenerationHistoryItem } from "@/lib/generationHistory";

type GenerationHistoryProps = {
  items: GenerationHistoryItem[];
  onRestore: (item: GenerationHistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
};

export function GenerationHistory({ items, onRestore, onDelete, onClear }: GenerationHistoryProps) {
  return (
    <section className="rounded-lg border border-stone-200 bg-stone-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-stone-950">Recent generations</h2>
          <p className="mt-1 text-xs leading-5 text-stone-600">The latest 10 packs are saved in this browser.</p>
        </div>
        {items.length > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="rounded-md border border-stone-300 bg-white px-2 py-1 text-xs font-semibold text-stone-700 transition hover:border-rose-400 hover:text-rose-700"
          >
            Clear
          </button>
        ) : null}
      </div>

      {items.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="rounded-md border border-stone-200 bg-white p-3">
              <button type="button" onClick={() => onRestore(item)} className="w-full text-left">
                <span className="block truncate text-sm font-bold text-stone-950">
                  {item.values.title.trim() || "Untitled Release"}
                </span>
                <span className="mt-1 block text-xs leading-5 text-stone-600">
                  {item.metadata.presetName} / {formatHistoryDate(item.createdAt)}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="mt-2 rounded-md border border-stone-300 px-2 py-1 text-xs font-semibold text-stone-700 transition hover:border-rose-400 hover:text-rose-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-xs leading-5 text-stone-600">Generate a metadata pack to start local history.</p>
      )}
    </section>
  );
}

function formatHistoryDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}
