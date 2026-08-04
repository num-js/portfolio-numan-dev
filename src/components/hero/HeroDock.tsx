"use client";

import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  FileDown,
  Home,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import Dock, { type DockItem } from "@/components/ui/dock";
import { heroContent } from "@/lib/heroContent";
import { socialLinks } from "@/lib/footerContent";

const github = socialLinks.find((link) => link.icon === "github");
const linkedin = socialLinks.find((link) => link.icon === "linkedin");

const dockItems: DockItem[] = [
  {
    id: "home",
    icon: <Home strokeWidth={1.75} />,
    label: "Home",
    onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  },
  {
    id: "experience",
    icon: <BriefcaseBusiness strokeWidth={1.75} />,
    label: "Experience",
    href: "#experience",
  },
  {
    id: "skills",
    icon: <Code2 strokeWidth={1.75} />,
    label: "Skills",
    href: "#skills",
  },
  {
    id: "projects",
    icon: <FolderKanban strokeWidth={1.75} />,
    label: "Projects",
    href: "#projects",
  },
  {
    id: "academics",
    icon: <GraduationCap strokeWidth={1.75} />,
    label: "Academics",
    href: "#academics",
    dividerAfter: true,
  },
  ...(github
    ? [
        {
          id: "github",
          icon: <SiGithub />,
          label: github.label,
          href: github.href,
        } satisfies DockItem,
      ]
    : []),
  ...(linkedin
    ? [
        {
          id: "linkedin",
          icon: <FaLinkedin />,
          label: linkedin.label,
          href: linkedin.href,
        } satisfies DockItem,
      ]
    : []),
  {
    id: "resume",
    icon: <FileDown strokeWidth={1.75} />,
    label: heroContent.resumeLabel,
    href: heroContent.resumeHref,
  },
];

export default function HeroDock() {
  return (
    <div className="absolute bottom-[clamp(1.5rem,5vw,2.75rem)] left-1/2 z-[6] w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2">
      <Dock
        items={dockItems}
        variant="glass"
        size="md"
        position="bottom"
        labelMode="responsive"
        magnification={1.45}
        className="pointer-events-auto"
      />
    </div>
  );
}
