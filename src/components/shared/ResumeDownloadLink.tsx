import { heroContent } from "@/lib/heroContent";

type ResumeDownloadLinkProps = {
  className?: string;
  label?: string;
};

export default function ResumeDownloadLink({
  className = "",
  label = heroContent.resumeLabel,
}: ResumeDownloadLinkProps) {
  return (
    <a
      href={heroContent.resumeHref}
      download
      className={`group/cta inline-flex items-center gap-1.5 rounded-full border border-accent-orange-soft/50 px-4 py-2 text-sm font-medium text-accent-orange-soft transition-colors duration-300 hover:bg-accent-orange/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-y-0.5"
      >
        <path
          d="M12 4v10m0 0l-4-4m4 4l4-4M5 18h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </a>
  );
}
