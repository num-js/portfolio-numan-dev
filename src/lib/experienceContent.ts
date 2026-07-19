// Placeholder work history — edit freely. `end: null` renders as "Present".
export type ExperienceEntry = {
  company: string;
  role: string;
  start: string; // "YYYY-MM"
  end: string | null; // "YYYY-MM" or null for present
  description: string;
  skills: string[];
};

export const experienceContent: ExperienceEntry[] = [
  {
    company: "Nimbus Labs",
    role: "Senior Frontend Engineer",
    start: "2023-02",
    end: null,
    description:
      "Leading the frontend architecture for a suite of data-visualization products, mentoring engineers, and driving adoption of a shared design system across five product teams.",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Design Systems"],
  },
  {
    company: "Kite & Co.",
    role: "Frontend Engineer",
    start: "2021-06",
    end: "2023-01",
    description:
      "Built customer-facing dashboards end-to-end, partnered closely with design on motion and interaction details, and improved core web vitals across the marketing site by 40%.",
    skills: ["React", "Node.js", "Three.js", "GSAP", "Tailwind CSS"],
  },
  {
    company: "Studio Loop",
    role: "Junior Web Developer",
    start: "2019-09",
    end: "2021-05",
    description:
      "Delivered interactive marketing sites and motion-driven landing pages for clients across fintech and consumer tech, translating Figma prototypes into pixel-perfect, performant builds.",
    skills: ["JavaScript", "SCSS", "WordPress", "Figma"],
  },
];

function parseYearMonth(value: string): { year: number; month: number } {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

export function formatMonthYear(value: string | null): string {
  if (!value) return "Present";
  const { year, month } = parseYearMonth(value);
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatDuration(start: string, end: string | null): string {
  const { year: sy, month: sm } = parseYearMonth(start);
  const now = new Date();
  const { year: ey, month: em } = end
    ? parseYearMonth(end)
    : { year: now.getFullYear(), month: now.getMonth() + 1 };

  const totalMonths = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years}y`);
  if (months > 0 || years === 0) parts.push(`${months}m`);
  return parts.join(" ");
}
