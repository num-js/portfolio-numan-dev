import Link from "next/link";

type FooterBrandProps = {
  size?: "sm" | "md";
  linked?: boolean;
};

export default function FooterBrand({ size = "md", linked = true }: FooterBrandProps) {
  const textSize = size === "sm" ? "text-[0.95rem]" : "text-[1.35rem]";
  const mark = (
    <span
      className={`inline-flex items-center font-bold tracking-tight text-[#f5f2ec] [font-family:var(--font-geist-mono)] ${textSize}`}
      style={{ textShadow: "0 0 24px rgba(255, 122, 60, 0.18)" }}
    >
      <span className="text-accent-orange-soft">&lt; </span>
      <span>N</span>
      <span className="text-accent-orange">_</span>
      <span>Ah</span>
      <span className="text-accent-orange-soft opacity-80"> /&gt;</span>
    </span>
  );

  if (!linked) return mark;

  return (
    <Link
      href="#"
      className="inline-flex rounded-sm transition-opacity duration-300 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
    >
      {mark}
    </Link>
  );
}
