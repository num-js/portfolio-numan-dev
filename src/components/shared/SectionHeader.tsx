import type { ReactNode } from "react";
import Image from "next/image";

type SectionHeaderProps = {
  sectionTitle: string;
  sectionId?: string;
  sectionIconPath?: string;
  sectionIcon?: ReactNode;
};

export default function SectionHeader({
  sectionTitle,
  sectionId,
  sectionIconPath,
  sectionIcon,
}: SectionHeaderProps) {
  return (
    <div className="flex justify-center">
      <div className="relative flex h-auto w-[min(420px,100%)] items-center justify-center">
        <Image
          src="/icons/curvy-lines.svg"
          alt=""
          width={420}
          height={180}
          unoptimized
          aria-hidden="true"
          className="h-auto w-full"
        />
        <h2
          id={sectionId}
          className="absolute m-0 flex max-w-[70%] items-center justify-center gap-1 text-center text-[clamp(1.35rem,2.5vw,1.5rem)] font-semibold tracking-wide text-accent-orange-soft drop-shadow-[0_0_24px_rgba(255,122,60,0.25)]"
        >
          {sectionTitle}
          {sectionIconPath ? (
            <Image
              src={sectionIconPath}
              alt=""
              width={24}
              height={24}
              unoptimized
              aria-hidden="true"
            />
          ) : null}
          {sectionIcon}
        </h2>
      </div>
    </div>
  );
}
