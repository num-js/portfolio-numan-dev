export type Project = {
  id: string;
  name: string;
  description: string;
  image: string;
  demoUrl: string;
  repoUrl?: string;
  tech: string[];
};

// Real, currently-shipped projects — same editable-config pattern as
// heroContent.ts / experienceContent.ts / skillsContent.ts.
export const projectsContent: Project[] = [
  {
    id: "struct-ui",
    name: "Struct-UI",
    description:
      "A collection of reusable UI components for React applications, built with Shadcn, Motion, and Tailwind CSS.",
    image: "/images/projects/struct-ui.png",
    demoUrl: "https://ui-struct.vercel.app",
    repoUrl: "https://github.com/TheUndefinedCoders/struct-ui",
    tech: ["React", "Next.js", "Tailwind CSS", "Shadcn", "Motion", "TypeScript"],
  },
  {
    id: "al-madad-welfare-society",
    name: "Al-Madad Welfare Society",
    description:
      "A fully responsive website for an NGO focused on uplifting underprivileged communities through initiatives in education, healthcare, and social welfare.",
    image: "/images/projects/al-madad-welfare-society.png",
    demoUrl: "https://almadadwelfaresociety.com",
    tech: ["React", "Shadcn", "Motion", "Tailwind CSS"],
  },
  {
    id: "aictc",
    name: "AI-Computer Training Center",
    description:
      "A web application for an offline computer training institute, enabling students to apply for admissions and track attendance digitally, with a comprehensive admin panel for courses, students, and fees.",
    image: "/images/projects/aictc.png",
    demoUrl: "https://aictc.vercel.app",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
  },
  {
    id: "college-path",
    name: "CollegePath",
    description:
      "A student-focused platform that simplifies the college admission journey by providing guidance, course discovery, and application support in one place.",
    image: "/images/projects/college-path.png",
    demoUrl: "https://collegepath.in",
    tech: ["React", "Shadcn", "Motion", "Tailwind CSS"],
  },
];
