import Container from "@/components/Container";
import { site } from "@/data/site";

export default function ResumePage() {
  return (
    <Container>
      <section className="py-12">
        <h1 className="text-3xl font-semibold">Resume</h1>
        <p className="text-neutral-600 mt-2">
          Replace <code>public/resume.pdf</code> with your real resume.
        </p>

        <div className="mt-6 flex gap-2">
          <a className="btn btn-primary" href={site.resumePath} download>
            Download PDF
          </a>
          <a className="btn" href={site.resumePath} target="_blank" rel="noreferrer">
            Open in new tab
          </a>
        </div>

        <div className="mt-6 card overflow-hidden">
          <iframe
            src={site.resumePath}
            title="Resume"
            className="h-[80vh] w-full"
          />
        </div>
      </section>
    </Container>
  );
}
