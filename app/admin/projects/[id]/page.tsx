"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const emptyProject = {
  name: "",
  slug: "",
  tagline: "",
  description: "",
  tags: [],
  stack: [],
  featured: false,
  links: { github: "", live: "", docs: "" },
  gallery: [],
  sections: {
    overview: "",
    problem: "",
    features: [],
    learnings: [],
  },
};

export default function ProjectEditor() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const isNew = projectId === "new";

  const [project, setProject] = useState<any>(emptyProject);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
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

  const handleChange = (field: string, value: any) => {
    setProject((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleLinksChange = (field: string, value: string) => {
    setProject((prev: any) => ({
      ...prev,
      links: { ...prev.links, [field]: value },
    }));
  };

  const handleSectionsChange = (field: string, value: any) => {
    setProject((prev: any) => ({
      ...prev,
      sections: { ...prev.sections, [field]: value },
    }));
  };

  const handleArrayChange = (field: string, value: string) => {
    const items = value.split(",").map((item) => item.trim()).filter(Boolean);
    handleChange(field, items);
  };

  const handleFeaturesChange = (value: string) => {
    const items = value.split("\n").map((item) => item.trim()).filter(Boolean);
    handleSectionsChange("features", items);
  };

  const handleLearningsChange = (value: string) => {
    const items = value.split("\n").map((item) => item.trim()).filter(Boolean);
    handleSectionsChange("learnings", items);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const url = isNew ? "/api/projects" : `/api/projects/${projectId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (res.ok) {
        setMessage(isNew ? "Project created successfully!" : "Project updated successfully!");
        if (isNew) {
          router.push("/admin/projects");
        }
      } else {
        setMessage("Error saving project.");
      }
    } catch (error) {
      setMessage("Error saving project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            {isNew ? "New Project" : "Edit Project"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {isNew ? "Create a new portfolio project" : "Update project details"}
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`mb-4 p-4 rounded ${
            message.includes("success")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={project.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Slug (URL)
              </label>
              <input
                type="text"
                value={project.slug || ""}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="auto-generated-from-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Tagline *
              </label>
              <input
                type="text"
                required
                value={project.tagline || ""}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={3}
                value={project.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={project.featured || false}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Project</span>
              </label>
            </div>
          </div>
        </div>

        {/* Tags & Stack */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Tags & Technologies
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={project.tags?.join(", ") || ""}
                onChange={(e) => handleArrayChange("tags", e.target.value)}
                placeholder="Web, System, Admin"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tech Stack (comma-separated)
              </label>
              <input
                type="text"
                value={project.stack?.join(", ") || ""}
                onChange={(e) => handleArrayChange("stack", e.target.value)}
                placeholder="Next.js, TypeScript, Tailwind"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Links</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="url"
                value={project.links?.github || ""}
                onChange={(e) => handleLinksChange("github", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Live Demo
              </label>
              <input
                type="url"
                value={project.links?.live || ""}
                onChange={(e) => handleLinksChange("live", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Documentation
              </label>
              <input
                type="url"
                value={project.links?.docs || ""}
                onChange={(e) => handleLinksChange("docs", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Project Details
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Overview *
              </label>
              <textarea
                rows={4}
                required
                value={project.sections?.overview || ""}
                onChange={(e) => handleSectionsChange("overview", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Problem Statement *
              </label>
              <textarea
                rows={4}
                required
                value={project.sections?.problem || ""}
                onChange={(e) => handleSectionsChange("problem", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Features (one per line)
              </label>
              <textarea
                rows={4}
                value={project.sections?.features?.join("\n") || ""}
                onChange={(e) => handleFeaturesChange(e.target.value)}
                placeholder="- Feature 1&#10;- Feature 2&#10;- Feature 3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Learnings (one per line)
              </label>
              <textarea
                rows={4}
                value={project.sections?.learnings?.join("\n") || ""}
                onChange={(e) => handleLearningsChange(e.target.value)}
                placeholder="- Learning 1&#10;- Learning 2&#10;- Learning 3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : isNew ? "Create Project" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
