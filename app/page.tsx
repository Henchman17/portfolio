"use client";

import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [site, setSite] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [credentials, setCredentials] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siteRes, projectsRes, credentialsRes] = await Promise.all([
          fetch("/api/site"),
          fetch("/api/projects"),
          fetch("/api/credentials"),
        ]);
        const siteData = await siteRes.json();
        const projectsData = await projectsRes.json();
        const credentialsData = await credentialsRes.json();
        setSite(siteData);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setCredentials(credentialsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featured = projects.filter((p) => p.featured).slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading data</div>
      </div>
    );
  }

  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Cover Photo */}
      <div 
        className="relative h-64 md:h-96 w-full bg-neutral-200"
        style={{
          backgroundImage: `url(${site?.profile?.coverImage || '/images/banner.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        {/* Gradient overlay at bottom for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="bg-white">
        <Container>
          <div className="relative -mt-12 md:-mt-24 pb-4 px-4 md:px-0 pt-16 md:pt-0">
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0 mx-auto md:mx-0 -mt-24 md:mt-0">
                <div 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-neutral-200 shadow-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${site?.profile?.avatar || '/images/avatar.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
              </div>

              {/* Profile Info & Buttons Container */}
              <div className="flex-1 flex flex-col md:flex-row md:items-end justify-between gap-4">
                {/* Profile Info */}
                <div className="text-center md:text-left pb-0 md:pb-2">
                  <h1 className="text-2xl md:text-4xl font-bold text-neutral-900">
                    {site?.name}
                  </h1>
                  <p className="text-neutral-500 text-sm md:text-base mt-1">
                    @{site?.profile?.username}
                  </p>
                  <p className="text-neutral-600 mt-2 max-w-xl">
                    {site?.title}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-end pb-0 md:pb-2">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                    Message
                  </Link>
                  <Link 
                    href="/resume" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-200 text-neutral-900 font-semibold rounded-lg hover:bg-neutral-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Resume
                  </Link>
                  <div className="relative">
                    <button 
                      onClick={() => setShowMenu(!showMenu)}
                      className="p-2.5 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </button>
                    {showMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                        <Link 
                          href="/admin/login" 
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        >
                          Admin Login
                        </Link>
                        <Link 
                          href="/contact" 
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        >
                          Contact Me
                        </Link>
                        <Link 
                          href="/resume" 
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        >
                          View Resume
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Profile Tabs */}
      <div className="bg-white border-t border-neutral-200">
        <Container>
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm md:text-base font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Content Area */}
      <div className="py-6">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-4">
            {/* Intro Card */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Intro</h2>
              <p className="text-neutral-700 mb-4">{site?.shortBio}</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-neutral-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>Lives in <span className="text-neutral-900 font-medium">{site?.location}</span></span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                  </svg>
                  <span>{site?.profile?.work}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                  <span>{site?.profile?.education}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span>{site?.profile?.relationship}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  <span>Joined {site?.profile?.joined}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-neutral-200">
                <div className="flex flex-wrap gap-2">
                  {site.socials?.github && (
                    <a 
                      href={site.socials.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm text-neutral-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {site.socials?.linkedin && (
                    <a 
                      href={site.socials.linkedin} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm text-neutral-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {site.socials?.facebook && (
                    <a 
                      href={site.socials.facebook} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm text-neutral-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {activeTab === "posts" && (
              <>
                {/* Featured Projects Post */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-sm font-bold text-neutral-500">
                        {site?.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{site?.name}</p>
                        <p className="text-xs text-neutral-500">Just now · 🌎</p>
                      </div>
                    </div>
                    <p className="text-neutral-800 mb-3">
                      Check out my latest projects! 🚀 Here are some of my featured works.
                    </p>
                  </div>
                  
                  {/* Projects Grid */}
                  <div className="px-4 pb-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {featured.map((p) => (
                        <ProjectCard key={p.slug} p={p} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Credentials Post */}
                {credentials && (
                  <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-sm font-bold text-neutral-500">
                          {site?.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{site?.name}</p>
                          <p className="text-xs text-neutral-500">Just now · 🌎</p>
                        </div>
                      </div>
                      <p className="text-neutral-800 mb-3">
                        My credentials and certifications 📜
                      </p>
                    </div>
                    
                    {/* Credentials Content */}
                    <div className="px-4 pb-4 space-y-4">
                      {/* Education */}
                      {credentials.education?.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-neutral-900 mb-2">Education</h3>
                          <div className="space-y-2">
                            {credentials.education.map((edu: any, idx: number) => (
                              <div key={idx} className="bg-neutral-50 rounded-lg p-3">
                                <p className="font-medium text-neutral-800">{edu.degree}</p>
                                <p className="text-sm text-neutral-600">{edu.school}</p>
                                <p className="text-xs text-neutral-500">{edu.year}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Certifications */}
                      {credentials.certifications?.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-neutral-900 mb-2">Certifications</h3>
                          <div className="space-y-2">
                            {credentials.certifications.map((cert: any, idx: number) => (
                              cert.link ? (
                                <a
                                  key={idx}
                                  href={cert.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block bg-neutral-50 hover:bg-neutral-100 rounded-lg p-3 transition-colors cursor-pointer"
                                >
                                  <p className="font-medium text-neutral-800">{cert.title}</p>
                                  <p className="text-sm text-neutral-600">{cert.issuer}</p>
                                  <p className="text-xs text-neutral-500">{cert.date}</p>
                                </a>
                              ) : (
                                <div key={idx} className="bg-neutral-50 rounded-lg p-3">
                                  <p className="font-medium text-neutral-800">{cert.title}</p>
                                  <p className="text-sm text-neutral-600">{cert.issuer}</p>
                                  <p className="text-xs text-neutral-500">{cert.date}</p>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills */}
                      {credentials.skills?.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-neutral-900 mb-2">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {credentials.skills.flatMap((skill: any) => skill.items).map((item: string, idx: number) => (
                              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* See All Projects Link */}
                <div className="text-center py-4">
                  <Link 
                    href="/projects" 
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
                  >
                    See all projects
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </>
            )}

            {activeTab === "about" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">About Me</h2>
                <p className="text-neutral-700 mb-6">{site?.shortBio}</p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="font-semibold text-neutral-900 mb-2">Location</h3>
                    <p className="text-neutral-600">{site?.location}</p>
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="font-semibold text-neutral-900 mb-2">Work</h3>
                    <p className="text-neutral-600">{site?.profile?.work}</p>
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="font-semibold text-neutral-900 mb-2">Education</h3>
                    <p className="text-neutral-600">{site?.profile?.education}</p>
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="font-semibold text-neutral-900 mb-2">Joined</h3>
                    <p className="text-neutral-600">{site?.profile?.joined}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">Contact</h3>
                  <a href={`mailto:${site?.email}`} className="text-blue-600 hover:underline">
                    {site?.email}
                  </a>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">All Projects</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {projects.map((p) => (
                      <ProjectCard key={p.slug || p._id} p={p} />
                    ))}
                  </div>
                </div>
                {projects.length === 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <p className="text-neutral-500">No projects yet. Check back soon!</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
      </div>
    </div>
  );
}
