import Link from "next/link";
import type { Project } from "@/data/project";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{p.name}</h3>
          <p className="text-sm text-neutral-600">{p.tagline}</p>
        </div>
        <Link className="btn" href={`/projects/${p.slug}`}>
          View
        </Link>
      </div>

      <p className="text-sm text-neutral-700">{p.description}</p>

      <div className="flex flex-wrap gap-2 pt-1">
        {p.tags.map((t) => (
          <span key={t} className="badge">
            {t}
          </span>
        ))}
      </div>

      <div className="pt-1 text-sm text-neutral-600">
        <span className="font-medium text-neutral-800">Stack:</span>{" "}
        {p.stack.join(" • ")}
      </div>
    </div>
  );
}
