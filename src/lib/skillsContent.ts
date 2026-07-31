import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGraphql,
  SiGreensock,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export type Skill = {
  name: string;
  icon: IconType;
  /** Approximate brand color, used only for a subtle hover glow tint. */
  color: string;
};

export type SkillCategory = {
  id: string;
  label: string;
  skills: Skill[];
};

// Placeholder skill set — edit freely, same pattern as heroContent.ts /
// experienceContent.ts. Categories drive one orbit cluster each.
export const skillsContent: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
      { name: "Three.js", icon: SiThreedotjs, color: "#ffffff" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#e8e8e8" },
      { name: "GraphQL", icon: SiGraphql, color: "#e10098" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Motion",
    skills: [
      { name: "GSAP", icon: SiGreensock, color: "#88ce02" },
      { name: "Git", icon: SiGit, color: "#f05032" },
      { name: "Docker", icon: SiDocker, color: "#2496ed" },
      { name: "Figma", icon: SiFigma, color: "#f24e1e" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
    ],
  },
];
