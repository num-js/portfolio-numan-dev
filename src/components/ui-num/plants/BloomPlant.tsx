"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import PlantPot from "./PlantPot";
import { plantSwayClass } from "./plantSway";

type BloomPlantProps = {
  className?: string;
  delay?: string;
};

export default function BloomPlant({
  className,
  delay = "0s",
}: BloomPlantProps) {
  const uid = useId().replace(/:/g, "");
  const petal = `${uid}-petal`;
  const center = `${uid}-center`;
  const potGrad = `${uid}-pot`;

  return (
    <svg
      viewBox="0 0 48 78"
      className={cn("h-[4.5rem] w-auto opacity-95 sm:h-20", className)}
      aria-hidden="true"
      style={{ animationDelay: delay }}
    >
      <defs>
        <linearGradient id={petal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe9d6" />
          <stop offset="55%" stopColor="#ffb37a" />
          <stop offset="100%" stopColor="#ff7a3c" />
        </linearGradient>
        <radialGradient id={center} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe9d6" />
          <stop offset="100%" stopColor="#ff7a3c" />
        </radialGradient>
        <linearGradient id={potGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7a3c" />
          <stop offset="100%" stopColor="#a84410" />
        </linearGradient>
      </defs>

      <g className={`${plantSwayClass} animate-sway-delayed`}>
        <path
          d="M24 62 C23 46 22 32 24 16"
          stroke="#a84410"
          strokeWidth="1.7"
          strokeLinecap="round"
          fill="none"
        />

        <g
          className={`${plantSwayClass} animate-sway-soft`}
          style={{ transformOrigin: "24px 40px" }}
        >
          <path
            d="M24 42 C14 44 8 38 7 30 C16 32 22 38 24 42 Z"
            fill="#ff7a3c"
          />
        </g>
        <g
          className={`${plantSwayClass} animate-sway`}
          style={{ transformOrigin: "24px 44px", animationDelay: "-0.8s" }}
        >
          <path
            d="M24 44 C34 46 40 38 40 29 C32 32 26 40 24 44 Z"
            fill="#ffb37a"
          />
        </g>

        <g
          className={`${plantSwayClass} animate-sway-soft`}
          style={{ transformOrigin: "24px 18px" }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="24"
              cy="12"
              rx="5.2"
              ry="9"
              fill={`url(#${petal})`}
              transform={`rotate(${deg} 24 18)`}
              opacity={0.92}
            />
          ))}
          <circle cx="24" cy="18" r="4.2" fill={`url(#${center})`} />
          <circle cx="24" cy="18" r="1.8" fill="#c45a22" opacity={0.85} />
        </g>
      </g>

      <ellipse
        cx="38"
        cy="10"
        rx="2.2"
        ry="3.4"
        fill="#ffb37a"
        className={`${plantSwayClass} animate-petal-drift`}
        style={{ transformOrigin: "38px 10px" }}
      />
      <ellipse
        cx="8"
        cy="22"
        rx="1.8"
        ry="2.8"
        fill="#ff7a3c"
        className={`${plantSwayClass} animate-petal-drift`}
        style={{ transformOrigin: "8px 22px", animationDelay: "-2s" }}
      />

      <PlantPot x={13} y={62} w={22} h={11} potGradId={potGrad} />
    </svg>
  );
}
