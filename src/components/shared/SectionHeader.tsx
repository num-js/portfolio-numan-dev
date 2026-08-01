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
      <div className="relative flex h-auto w-[350px] max-w-full items-center justify-center">
        <Image
          src="/icons/curvy-lines.svg"
          alt=""
          width={350}
          height={180}
          unoptimized
          aria-hidden="true"
          className="h-auto w-full"
        />
        <h2
          id={sectionId}
          className="absolute m-0 flex items-center gap-2 text-2xl font-semibold tracking-wide text-accent-orange-soft drop-shadow-[0_0_24px_rgba(255,122,60,0.25)]"
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
