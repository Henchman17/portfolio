"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    lastUpdated: null as string | null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, siteRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/site"),
      ]);

      const projects = await projectsRes.json();
      const site = await siteRes.json();

      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        lastUpdated: site?.updatedAt
          ? new Date(site.updatedAt).toLocaleDateString()
          : null,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    {
      title: "Edit Site Info",
      description: "Update your profile, bio, and contact information",
      href: "/admin/site",
      color: "bg-blue-500",
    },
    {
      title: "Manage Projects",
      description: "Add, edit, or remove portfolio projects",
      href: "/admin/projects",
      color: "bg-green-500",
    },
    {
      title: "Update Credentials",
      description: "Manage certifications, education, and skills",
      href: "/admin/credentials",
      color: "bg-purple-500",
    },
    {
      title: "View Portfolio",
      description: "See how your site looks to visitors",
      href: "/",
      color: "bg-gray-500",
      external: true,
    },
  ];

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your portfolio content and settings
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-3xl font-bold text-gray-900">
                      {stats.projects}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      Total Projects
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-3xl font-bold text-gray-900">
                      {stats.lastUpdated || "Never"}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      Last Updated
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div>
                  <span
                    className={`rounded-lg inline-flex p-3 ${link.color} text-white ring-4 ring-white`}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{link.description}</p>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
