"use client";

import Container from "@/components/Container";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [site, setSite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
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
    fetchSite();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  }

  return (
    <Container>
      <section className="py-12">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="text-neutral-600 mt-2">
          Send a message or reach me through my socials.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <form onSubmit={submit} className="card p-6 flex flex-col gap-3">
            <div>
              <label className="text-sm text-neutral-700">Name</label>
              <input 
                className="input mt-1" 
                placeholder="Your name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-neutral-700">Email</label>
              <input 
                className="input mt-1" 
                placeholder="you@email.com" 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-neutral-700">Message</label>
              <textarea 
                className="input mt-1 min-h-[140px]" 
                placeholder="Write your message..." 
                required 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button 
              className="btn btn-primary" 
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>

            {status === "sent" && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                Failed to send message. Please try again later.
              </div>
            )}
          </form>

          <div className="grid gap-4">
            {loading ? (
              <div className="card p-6">Loading...</div>
            ) : (
              <>
                <div className="card p-6">
                  <h2 className="text-xl font-semibold">Email</h2>
                  <a className="mt-2 inline-block" href={`mailto:${site?.email}`}>
                    {site?.email}
                  </a>
                </div>

                <div className="card p-6">
                  <h2 className="text-xl font-semibold">Socials</h2>
                  <div className="mt-3 flex flex-col gap-2">
                    <a href={site?.socials?.github} target="_blank" rel="noreferrer">GitHub</a>
                    <a href={site?.socials?.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href={site?.socials?.facebook} target="_blank" rel="noreferrer">Facebook</a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}
