export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  stack: string[];
  featured?: boolean;
  links?: {
    github?: string;
    live?: string;
    docs?: string;
  };
  gallery?: string[]; // image URLs in /public or external
  sections: {
    overview: string;
    problem: string;
    features: string[];
    learnings: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "student-records-system",
    name: "Student Records System",
    tagline: "A system for managing student records and requests.",
    description:
      "Handles student records, admin approvals, request tracking, and status updates with a clean UI.",
    tags: ["Web", "System", "Admin"],
    stack: ["Flutter / Web", "Dart", "Supabase", "PostgreSQL"],
    featured: true,
    links: {
      github: "https://github.com/yourusername/student-records-system",
      live: "",
      docs: ""
    },
    gallery: [],
    sections: {
      overview:
        "This project centralizes student records and request workflows to reduce manual processing and improve tracking.",
      problem:
        "Many student processes are handled manually, making it difficult to track status, validate data, and maintain consistency.",
      features: [
        "Role-based access (admin/student)",
        "Request submission + approval workflow",
        "Search and filtering for records",
        "Audit-friendly status tracking"
      ],
      learnings: [
        "Improved data modeling and request lifecycle design",
        "Built reusable UI components for consistency",
        "Learned how to reduce errors using validation and constraints"
      ]
    }
  },
  {
    slug: "ojt-practicum-tracker",
    name: "OJT / Practicum Tracker",
    tagline: "Track requirements, documents, and progress in one place.",
    description:
      "A tracker for OJT application flow: recommendation letters, acceptance, MOA, monitoring, and deadlines.",
    tags: ["Web", "Workflow"],
    stack: ["Next.js", "TypeScript", "Tailwind"],
    featured: true,
    sections: {
      overview:
        "A lightweight tracker to help students and coordinators follow the OJT process consistently.",
      problem:
        "Students miss steps and deadlines when the process is communicated only through static instructions.",
      features: [
        "Flow-based checklist",
        "Document list per stage",
        "Notes + reminders section"
      ],
      learnings: [
        "Designed clear information architecture",
        "Improved UX by reducing cognitive load"
      ]
    }
  }
];

export const allTags = Array.from(
  new Set(projects.flatMap((p) => p.tags))
).sort();
