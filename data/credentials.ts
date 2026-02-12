export type CredentialItem = {
  title: string;
  issuer?: string;
  date?: string;
  note?: string;
};

export const education: CredentialItem[] = [
  {
    title: "BS Information Technology (BSIT)",
    issuer: "Pamantasan ng Lungsod ng San Pablo (PLSP)",
    date: "Expected: 2026",
    note: "Replace with your year level / honors if any."
  }
];

export const certifications: CredentialItem[] = [
  { title: "Certification Title (Placeholder)", issuer: "Issuer", date: "YYYY" }
];

export const seminars: CredentialItem[] = [
  { title: "Seminar/Training Title (Placeholder)", issuer: "Organizer", date: "YYYY" }
];

export const awards: CredentialItem[] = [
  { title: "Award/Achievement (Placeholder)", issuer: "Organization", date: "YYYY" }
];
