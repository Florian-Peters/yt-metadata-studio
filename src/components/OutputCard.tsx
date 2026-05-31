import { CopyButton } from "@/components/CopyButton";

type OutputCardProps = {
  title: string;
  content: string | string[];
};

export function OutputCard({ title, content }: OutputCardProps) {
  const copyText = Array.isArray(content) ? content.join("\n") : content;

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-stone-950">{title}</h2>
        <CopyButton text={copyText} />
      </div>

      {Array.isArray(content) ? (
        <ul className="space-y-2">
          {content.map((item) => (
            <li key={item} className="rounded-md bg-stone-50 px-3 py-2 text-sm leading-6 text-stone-800">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="whitespace-pre-line text-sm leading-6 text-stone-800">{content}</p>
      )}
    </section>
  );
}
