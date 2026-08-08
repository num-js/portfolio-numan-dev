"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import PlantPot from "./PlantPot";
import { plantSwayClass } from "./plantSway";

type BudPlantProps = {
  className?: string;
};

export default function BudPlant({ className }: BudPlantProps) {
  const uid = useId().replace(/:/g, "");
  const bud = `${uid}-bud`;
  const potGrad = `${uid}-pot`;

  return (
    <svg
      viewBox="0 0 36 64"
      className={cn("h-14 w-auto opacity-95 sm:h-16", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={bud} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe9d6" />
          <stop offset="100%" stopColor="#ff7a3c" />
        </linearGradient>
        <linearGradient id={potGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7a3c" />
          <stop offset="100%" stopColor="#a84410" />
        </linearGradient>
      </defs>

      <g className={`${plantSwayClass} animate-sway-soft`}>
        <path
          d="M18 52 C18 38 17 26 18 14"
          stroke="#a84410"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <g
          className={`${plantSwayClass} animate-sway`}
          style={{ transformOrigin: "18px 34px" }}
        >
          <path
            d="M18 34 C10 33 6 26 8 18 C14 20 18 28 18 34 Z"
            fill="#ff7a3c"
          />
        </g>
        <g
          className={`${plantSwayClass} animate-sway-delayed`}
          style={{ transformOrigin: "18px 30px" }}
        >
          <path
            d="M18 30 C26 28 30 20 28 12 C22 14 18 22 18 30 Z"
            fill="#ffb37a"
          />
        </g>

        <g
          className={`${plantSwayClass} animate-sway`}
          style={{ transformOrigin: "18px 14px", animationDelay: "-1.5s" }}
        >
          <path
            d="M18 6 C22 8 24 14 18 20 C12 14 14 8 18 6 Z"
            fill={`url(#${bud})`}
          />
          <path
            d="M18 8 C20 10 20 14 18 17 C16 14 16 10 18 8 Z"
            fill="#ffe9d6"
            opacity={0.7}
          />
        </g>
      </g>
      <PlantPot x={8} y={52} w={20} h={10} potGradId={potGrad} />
    </svg>
  );
}
