export interface ToolCardItem {
  name: string;
  href: string;
  description: string;
  internal?: boolean;
  requiresAuthorization?: boolean;
  authorizationNote?: string;
  draft?: boolean;
}

export interface ToolSection {
  key: "developed" | "internal";
  title: string;
  summary: string;
  items: ToolCardItem[];
}

export const toolSections: ToolSection[] = [
  {
    key: "developed",
    title: "Tools We Develop",
    summary: "Open tools and platforms developed by YangsAI for broader use.",
    items: [
      {
        name: "Probing Memes Benchmark",
        href: "https://probing-memes.benchmarks.yangs.ai",
        description: "Evaluation platform and leaderboard for the Probing Memes paradigm.",
      },
      {
        name: "Younger Datasets",
        href: "https://datasets.yangs.ai/younger",
        description: "Dataset hub for the Younger project and related artifacts.",
      },
    ],
  },
  {
    key: "internal",
    title: "Internal Research Assist Tools",
    summary: "Assistant tools used internally to accelerate research workflows.",
    items: [
      {
        name: "FRESH Documentation",
        href: "https://fresh.research.jason-young.me",
        description: "Internal documentation and working notes for research acceleration.",
        internal: true,
        requiresAuthorization: true,
        authorizationNote: "Requires internal access approval.",
      },
      {
        name: "Benchmarks Portal",
        href: "https://benchmarks.yangs.ai",
        description: "Internal-first benchmark portal used for ongoing experiment cycles.",
        internal: true,
        requiresAuthorization: true,
        authorizationNote: "Some workspaces require login and project-level permission.",
      },
    ],
  },
];
