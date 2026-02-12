"use client";

import { useEffect, useState } from "react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface Skill {
  category: string;
  items: string[];
}

export default function CredentialsEditor() {
  const [credentials, setCredentials] = useState<{
    certifications: Certification[];
    education: Education[];
    skills: Skill[];
  }>({
    certifications: [],
    education: [],
    skills: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const res = await fetch("/api/credentials");
      const data = await res.json();
      setCredentials({
        certifications: data.certifications || [],
        education: data.education || [],
        skills: data.skills || [],
      });
    } catch (error) {
      console.error("Error fetching credentials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        setMessage("Credentials saved successfully!");
      } else {
        setMessage("Error saving credentials.");
      }
    } catch (error) {
      setMessage("Error saving credentials.");
    } finally {
      setSaving(false);
    }
  };

  const addCertification = () => {
    setCredentials((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { title: "", issuer: "", date: "", link: "" },
      ],
    }));
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const removeCertification = (index: number) => {
    setCredentials((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setCredentials((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "" }],
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (index: number) => {
    setCredentials((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    setCredentials((prev) => ({
      ...prev,
      skills: [...prev.skills, { category: "", items: [] }],
    }));
  };

  const updateSkillCategory = (index: number, category: string) => {
    setCredentials((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? { ...skill, category } : skill
      ),
    }));
  };

  const updateSkillItems = (index: number, items: string) => {
    setCredentials((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index
          ? { ...skill, items: items.split(",").map((s) => s.trim()).filter(Boolean) }
          : skill
      ),
    }));
  };

  const removeSkill = (index: number) => {
    setCredentials((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            Edit Credentials
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your certifications, education, and skills
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
        {/* Certifications */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
            <button
              type="button"
              onClick={addCertification}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              + Add Certification
            </button>
          </div>
          <div className="space-y-4">
            {credentials.certifications.map((cert, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={cert.title}
                      onChange={(e) =>
                        updateCertification(index, "title", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Issuer
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) =>
                        updateCertification(index, "issuer", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) =>
                        updateCertification(index, "date", e.target.value)
                      }
                      placeholder="e.g., January 2024"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Link
                    </label>
                    <input
                      type="url"
                      value={cert.link}
                      onChange={(e) =>
                        updateCertification(index, "link", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Education</h3>
            <button
              type="button"
              onClick={addEducation}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              + Add Education
            </button>
          </div>
          <div className="space-y-4">
            {credentials.education.map((edu, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      School
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) =>
                        updateEducation(index, "school", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) =>
                        updateEducation(index, "year", e.target.value)
                      }
                      placeholder="e.g., 2020 - 2024"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Skills</h3>
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              + Add Skill Category
            </button>
          </div>
          <div className="space-y-4">
            {credentials.skills.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkillCategory(index, e.target.value)}
                      placeholder="e.g., Frontend, Backend"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={skill.items.join(", ")}
                      onChange={(e) => updateSkillItems(index, e.target.value)}
                      placeholder="React, TypeScript, Node.js"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
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
