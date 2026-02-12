export default function TagChips({
  tags,
  selected,
  onToggle
}: {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => {
        const active = selected.includes(t);
        return (
          <button
            key={t}
            onClick={() => onToggle(t)}
            className={active ? "badge bg-neutral-900 text-white border-neutral-900" : "badge"}
            type="button"
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
