export type FooterNavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "gmail" | "linkedin" | "phone" | "whatsapp";
};

export const footerBio =
  "Md Numan Ahmed — a Full-Stack Developer from a small village in West Bengal, India. I build front-end experiences, back-end systems, mobile apps, and REST APIs with the same care I bring to motion and polish.";

export const footerNavLinks: FooterNavLink[] = [
  { label: "Home", href: "#" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Academics", href: "#academics" },
];

export const footerSkillHighlights: string[] = [
  "Front-End Development",
  "Back-End Development",
  "Hybrid-App Development",
  "PWA Development",
  "API Development",
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/num-js",
    icon: "github",
  },
  {
    label: "Email",
    href: "mailto:mdnmnahmed@gmail.com",
    icon: "gmail",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/numan-dev/",
    icon: "linkedin",
  },
  {
    label: "Phone",
    href: "tel:7001959252",
    icon: "phone",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/qr/3PE2YWW6M7F5L1",
    icon: "whatsapp",
  },
];
