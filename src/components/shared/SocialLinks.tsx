import { SiGithub, SiGmail, SiWhatsapp } from "react-icons/si";
import { socialLinks } from "@/lib/footerContent";

const socialIcons = {
  github: SiGithub,
  gmail: SiGmail,
  whatsapp: SiWhatsapp,
  linkedin: null,
  phone: null,
} as const;

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.1 21 3 13.9 3 5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type SocialLinksProps = {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
};

const defaultLinkClassName =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-glass-border bg-glass text-white/75 transition-all duration-300 hover:border-accent-orange-soft/45 hover:text-accent-orange-soft hover:shadow-[0_0_20px_rgba(255,122,60,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft";

export default function SocialLinks({
  className = "flex flex-wrap gap-3",
  linkClassName = defaultLinkClassName,
  iconClassName = "h-5 w-5",
}: SocialLinksProps) {
  return (
    <div className={className}>
      {socialLinks.map(({ label, href, icon }) => {
        const Icon = socialIcons[icon];
        return (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={label}
            className={linkClassName}
          >
            {icon === "phone" ? (
              <PhoneIcon className={iconClassName} />
            ) : icon === "linkedin" ? (
              <LinkedInIcon className={iconClassName} />
            ) : (
              Icon && <Icon className={iconClassName} />
            )}
          </a>
        );
      })}
    </div>
  );
}
