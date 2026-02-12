"use client";

import { useEffect, useState } from "react";

export default function SiteEditor() {
  const [site, setSite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSite();
  }, []);

  const fetchSite = async () => {
    try {
      const res = await fetch("/api/site");
      const data = await res.json();
      setSite(data);
    } catch (error) {
      console.error("Error fetching site:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setSite((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleProfileChange = (field: string, value: string) => {
    setSite((prev: any) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const handleSocialChange = (field: string, value: string) => {
    setSite((prev: any) => ({
      ...prev,
      socials: { ...prev.socials, [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(site),
      });

      if (res.ok) {
        setMessage("Site info saved successfully!");
      } else {
        setMessage("Error saving site info.");
      }
    } catch (error) {
      setMessage("Error saving site info.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!site) return <div className="text-center py-8">Error loading site data.</div>;

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            Edit Site Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your profile details and contact information
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
                Full Name
              </label>
              <input
                type="text"
                value={site.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={site.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={site.location || ""}
                onChange={(e) => handleChange("location", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={site.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Bio</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Bio
            </label>
            <textarea
              rows={3}
              value={site.shortBio || ""}
              onChange={(e) => handleChange("shortBio", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Social Links
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="url"
                value={site.socials?.github || ""}
                onChange={(e) => handleSocialChange("github", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="url"
                value={site.socials?.linkedin || ""}
                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facebook
              </label>
              <input
                type="url"
                value={site.socials?.facebook || ""}
                onChange={(e) => handleSocialChange("facebook", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Profile Information
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={site.profile?.username || ""}
                onChange={(e) => handleProfileChange("username", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Work
              </label>
              <textarea
                rows={4}
                value={site.profile?.work || ""}
                onChange={(e) => handleProfileChange("work", e.target.value)}
                placeholder="Describe your work experience, current position, responsibilities..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Education
              </label>
              <textarea
                rows={4}
                value={site.profile?.education || ""}
                onChange={(e) => handleProfileChange("education", e.target.value)}
                placeholder="Describe your educational background, degrees, achievements..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Joined
              </label>
              <input
                type="text"
                value={site.profile?.joined || ""}
                onChange={(e) => handleProfileChange("joined", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
