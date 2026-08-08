"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import PlantPot from "./PlantPot";
import { plantSwayClass } from "./plantSway";

type LeafPlantProps = {
  className?: string;
};

export default function LeafPlant({ className }: LeafPlantProps) {
  const uid = useId().replace(/:/g, "");
  const leafA = `${uid}-leafA`;
  const leafB = `${uid}-leafB`;
  const potGrad = `${uid}-pot`;

  return (
    <svg
      viewBox="0 0 40 72"
      className={cn("h-16 w-auto opacity-95 sm:h-[4.75rem]", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={leafA} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffb37a" />
          <stop offset="100%" stopColor="#ff7a3c" />
        </linearGradient>
        <linearGradient id={leafB} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe9d6" />
          <stop offset="100%" stopColor="#ff7a3c" />
        </linearGradient>
        <linearGradient id={potGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7a3c" />
          <stop offset="100%" stopColor="#a84410" />
        </linearGradient>
      </defs>

      <g className={`${plantSwayClass} animate-sway`}>
        <path
          d="M20 58 C20 42 18 28 20 14"
          stroke="#a84410"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <g
          className={`${plantSwayClass} animate-sway-soft`}
          style={{ transformOrigin: "20px 30px" }}
        >
          <path
            d="M20 30 C10 28 4 20 6 12 C14 14 20 22 20 30 Z"
            fill={`url(#${leafA})`}
          />
        </g>
        <g
          className={`${plantSwayClass} animate-sway-delayed`}
          style={{ transformOrigin: "20px 36px" }}
        >
          <path
            d="M20 36 C30 34 36 24 34 14 C26 16 20 26 20 36 Z"
            fill={`url(#${leafB})`}
          />
        </g>
        <g
          className={`${plantSwayClass} animate-sway`}
          style={{ transformOrigin: "20px 22px", animationDelay: "-1.2s" }}
        >
          <path
            d="M20 22 C12 18 10 8 14 2 C20 6 22 14 20 22 Z"
            fill="#ff7a3c"
          />
        </g>
      </g>
      <PlantPot x={9} y={58} w={22} h={11} potGradId={potGrad} />
    </svg>
  );
}
