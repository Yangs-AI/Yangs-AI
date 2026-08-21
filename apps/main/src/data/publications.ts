import { papers, type PaperAuthor, type PaperEntry, authorLinks } from "./papers";

export const publicationKindOptions = [
  "paper",
  "review",
  "monograph",
  "patent",
  "thesis",
  "book",
  "report",
  "other",
] as const;

export type PublicationKind = (typeof publicationKindOptions)[number];

export const publicationKindLabels: Record<PublicationKind, string> = {
  paper: "Paper",
  review: "Review",
  monograph: "Monograph",
  patent: "Patent",
  thesis: "Thesis",
  book: "Book",
  report: "Report",
  other: "Other",
};

// Display order used by publication filters and grouped sections.
export const publicationKindOrder: PublicationKind[] = [
  "paper",
  "review",
  "monograph",
  "patent",
  "thesis",
  "book",
  "report",
  "other",
];

export interface PublicationEntry {
  id: string;
  kind: PublicationKind;
  title: string;
  venue?: string;
  publishedOn: string;
  authors: PaperAuthor[];
  bibtex?: string;
  paperUrl?: string;
  preprintUrl?: string;
  otherUrl?: string;
  codeUrl?: string;
  selected?: boolean;
}

const paperPublications: PublicationEntry[] = papers.map((paper) => ({
  ...paper,
  kind: "paper",
}));

// Reserved for future non-paper records such as books, patents, and monographs.
const extraPublications: PublicationEntry[] = [];

export const publications: PublicationEntry[] = [...paperPublications, ...extraPublications];

// Backward-compatible aliases for existing paper-first pages/components.
export type { PaperAuthor, PaperEntry };
export { authorLinks };
export const publicationAuthors = authorLinks;
export const paperEntries: PaperEntry[] = publications
  .filter((item) => item.kind === "paper")
  .map(({ kind: _kind, ...paper }) => paper as PaperEntry);
