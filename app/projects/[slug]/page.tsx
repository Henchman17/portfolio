"use client";

import Container from "@/components/Container";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const [p, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const fetchSlug = async () => {
      const { slug } = await params;
      setSlug(slug);
    };
    fetchSlug();
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <Container>
        <div className="py-12 text-center">Loading...</div>
      </Container>
    );
  }

  if (!p) return notFound();

  return (
    <Container>
      <section className="py-12">
        <Link href="/projects" className="btn">
          ← Back to Projects
        </Link>

        <div className="mt-6 flex flex-col gap-3">
          <h1 className="text-3xl md:text-4xl font-semibold">{p.name}</h1>
          <p className="text-neutral-600">{p.tagline}</p>

          <div className="flex flex-wrap gap-2 pt-1">
            {p.tags?.map((t: string) => (
              <span key={t} className="badge">
                {t}
              </span>
            ))}
          </div>

          <div className="text-sm text-neutral-600 pt-1">
            <span className="font-medium text-neutral-800">Stack:</span>{" "}
            {p.stack?.join(" • ")}
          </div>

          {p.links && (
            <div className="flex flex-wrap gap-2 pt-3">
              {p.links.github && (
                <a className="btn" href={p.links.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {p.links.live && (
                <a className="btn" href={p.links.live} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
              {p.links.docs && (
                <a className="btn" href={p.links.docs} target="_blank" rel="noreferrer">
                  Docs
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-2 text-neutral-700">{p.sections.overview}</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold">Problem / Goal</h2>
            <p className="mt-2 text-neutral-700">{p.sections.problem}</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="mt-2 list-disc pl-6 text-neutral-700">
              {p.sections?.features?.map((f: string) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold">What I Learned</h2>
            <ul className="mt-2 list-disc pl-6 text-neutral-700">
              {p.sections?.learnings?.map((l: string) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
}
