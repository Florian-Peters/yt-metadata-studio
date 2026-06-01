import type { MetadataScore } from "@/lib/scoreMetadata";

type MetadataScoreCardProps = {
  score: MetadataScore;
};

export function MetadataScoreCard({ score }: MetadataScoreCardProps) {
  const tone =
    score.score >= 80
      ? "border-teal-700 bg-teal-50 text-teal-950"
      : score.score >= 60
        ? "border-amber-500 bg-amber-50 text-amber-950"
        : "border-rose-400 bg-rose-50 text-rose-950";

  return (
    <section className={`rounded-lg border p-5 shadow-sm ${tone}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold">Metadata Score</h2>
          <p className="mt-1 text-sm leading-6">A simple local SEO readiness check for this metadata pack.</p>
        </div>
        <div className="text-4xl font-black">{score.score}</div>
      </div>

      {score.tips.length > 0 ? (
        <ul className="mt-4 space-y-2 text-sm leading-6">
          {score.tips.map((tip) => (
            <li key={tip}>- {tip}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm font-semibold">Looks strong for a first publishing pass.</p>
      )}
    </section>
  );
}
