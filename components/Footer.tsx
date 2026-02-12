import Container from "./Container";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200">
      <Container>
        <div className="py-10 text-sm text-neutral-600 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href={site.socials.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
