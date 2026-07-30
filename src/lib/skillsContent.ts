import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiAngular,
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiJira,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostman,
  SiPwa,
  SiReact,
  SiRedux,
  SiSocketdotio,
  SiTailwindcss,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

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

// Skill set mirrored from the previous portfolio — categories drive one
// orbit cluster each.
export const skillsContent: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "React.js", icon: SiReact, color: "#61dafb" },
      { name: "Angular", icon: SiAngular, color: "#dd0031" },
      { name: "Redux", icon: SiRedux, color: "#764abc" },
      { name: "Material-UI", icon: SiMui, color: "#007fff" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#e8e8e8" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
      { name: "Socket IO", icon: SiSocketdotio, color: "#ffffff" },
      { name: "AWS-S3", icon: FaAws, color: "#ff9900" },
      { name: "Rest API", icon: SiOpenapiinitiative, color: "#6ba539" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "VS Code", icon: VscVscode, color: "#007acc" },
      { name: "Postman", icon: SiPostman, color: "#ff6c37" },
      { name: "Git", icon: SiGit, color: "#f05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "Jira", icon: SiJira, color: "#0052cc" },
      { name: "PWA", icon: SiPwa, color: "#5a0fc8" },
    ],
  },
];
