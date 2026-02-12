"use client";

import Container from "@/components/Container";
import { useEffect, useState } from "react";

const defaultSkills = {
  Frontend: ["HTML/CSS", "JavaScript/TypeScript", "React/Next.js", "Flutter"],
  Backend: ["Node.js", "REST APIs"],
  Database: ["PostgreSQL", "Supabase"],
  Tools: ["Git/GitHub", "Figma", "VS Code"]
};

export default function AboutPage() {
  const [site, setSite] = useState<any>(null);
  const [skills, setSkills] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siteRes, credentialsRes] = await Promise.all([
          fetch("/api/site"),
          fetch("/api/credentials"),
        ]);
        const siteData = await siteRes.json();
        const credentialsData = await credentialsRes.json();
        setSite(siteData);
        
        // Convert skills from API format to display format
        if (credentialsData?.skills?.length > 0) {
          const skillsObj: Record<string, string[]> = {};
          credentialsData.skills.forEach((skill: any) => {
            skillsObj[skill.category] = skill.items;
          });
          setSkills(skillsObj);
        } else {
          setSkills(defaultSkills);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="text-neutral-600 mt-2">A quick profile and skill summary.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="card p-6 md:col-span-2">
            <h2 className="text-xl font-semibold">Bio</h2>
            <p className="mt-3 text-neutral-700">{site?.shortBio}</p>
            <p className="mt-3 text-neutral-700">
              Replace this with your story: what you build, what you enjoy, and what roles you're targeting.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold">Quick Info</h2>
            <div className="mt-3 text-sm text-neutral-700">
              <div><span className="font-medium">Location:</span> {site?.location}</div>
              <div className="mt-2"><span className="font-medium">Email:</span> {site?.email}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {skills && Object.entries(skills).map(([group, items]) => (
            <div key={group} className="card p-6">
              <h2 className="text-xl font-semibold">{group}</h2>
              <ul className="mt-3 list-disc pl-6 text-neutral-700">
                {(items as string[]).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
