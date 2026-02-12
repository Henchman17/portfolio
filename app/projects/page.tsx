"use client";

import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import TagChips from "@/components/TagChips";
import { useEffect, useMemo, useState } from "react";

export default function ProjectsPage() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        const projectsData = Array.isArray(data) ? data : [];
        setProjects(projectsData);
        
        // Extract unique tags
        const tags = Array.from(
          new Set(projectsData.flatMap((p: any) => p.tags || []))
        ).sort() as string[];
        setAllTags(tags);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.stack?.join(" ").toLowerCase().includes(query) ||
        p.tags?.join(" ").toLowerCase().includes(query);

      const matchesTags =
        selected.length === 0 || selected.every((t) => p.tags?.includes(t));

      return matchesQuery && matchesTags;
    });
  }, [q, selected, projects]);

  function toggleTag(tag: string) {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <Container>
      <section className="py-12">
        <h1 className="text-3xl font-semibold">Projects / Systems</h1>
        <p className="text-neutral-600 mt-2">
          Browse my systems with filters, stacks, and case studies.
        </p>

        <div className="mt-6 grid gap-4">
          <input
            className="input"
            placeholder="Search by name, stack, tags..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <TagChips tags={allTags} selected={selected} onToggle={toggleTag} />

          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="card p-6 text-neutral-700">
              No projects match your search/filters.
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
