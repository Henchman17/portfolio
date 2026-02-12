"use client";

import Container from "@/components/Container";
import { useEffect, useState } from "react";

interface CredentialItem {
  title?: string;
  degree?: string;
  issuer?: string;
  school?: string;
  date?: string;
  year?: string;
  note?: string;
  link?: string;
}

function Section({
  title,
  items
}: {
  title: string;
  items: CredentialItem[];
}) {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((i, idx) => (
          i.link ? (
            <a
              key={idx}
              href={i.link}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-neutral-200 p-4 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <div className="font-medium">{i.title || i.degree}</div>
              <div className="text-sm text-neutral-600">
                {[i.issuer || i.school, i.date || i.year].filter(Boolean).join(" • ")}
              </div>
              {i.note && <div className="text-sm text-neutral-700 mt-2">{i.note}</div>}
            </a>
          ) : (
            <div key={idx} className="rounded-xl border border-neutral-200 p-4">
              <div className="font-medium">{i.title || i.degree}</div>
              <div className="text-sm text-neutral-600">
                {[i.issuer || i.school, i.date || i.year].filter(Boolean).join(" • ")}
              </div>
              {i.note && <div className="text-sm text-neutral-700 mt-2">{i.note}</div>}
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function SkillsSection({ skills }: { skills: { category: string; items: string[] }[] }) {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold">Skills</h2>
      <div className="mt-4 grid gap-4">
        {skills.map((skill, idx) => (
          <div key={idx}>
            <div className="font-medium text-neutral-800">{skill.category}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {skill.items.map((item) => (
                <span key={item} className="badge">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const res = await fetch("/api/credentials");
        const data = await res.json();
        setCredentials(data);
      } catch (error) {
        console.error("Error fetching credentials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCredentials();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="py-12 text-center">Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="py-12">
        <h1 className="text-3xl font-semibold">Credentials</h1>
        <p className="text-neutral-600 mt-2">
          Education, certifications, and skills.
        </p>

        <div className="mt-8 grid gap-6">
          {credentials?.education?.length > 0 && (
            <Section title="Education" items={credentials.education} />
          )}
          {credentials?.certifications?.length > 0 && (
            <Section title="Certifications" items={credentials.certifications} />
          )}
          {credentials?.skills?.length > 0 && (
            <SkillsSection skills={credentials.skills} />
          )}
        </div>
      </section>
    </Container>
  );
}
