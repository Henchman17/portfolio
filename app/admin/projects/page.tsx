"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            Manage Projects
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Add, edit, or remove portfolio projects
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Project
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects yet.</p>
            <Link
              href="/admin/projects/new"
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              Create your first project
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {projects.map((project) => (
              <li key={project._id}>
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <div className="flex text-sm">
                        <p className="font-medium text-blue-600 truncate">
                          {project.name}
                        </p>
                        {project.featured && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <p>{project.tagline}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0 flex space-x-2">
                    <Link
                      href={`/admin/projects/${project._id}`}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
