import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PillProps = {
  children: ReactNode;
  className?: string;
};

export default function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent-orange-soft/35 bg-white/5 px-2.5 py-1 text-[0.65rem] text-white/65",
        className
      )}
    >
      {children}
    </span>
  );
}
