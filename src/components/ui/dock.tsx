"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  dividerAfter?: boolean;
}

export interface DockProps {
  items: DockItem[];
  magnification?: number;
  distance?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "glass" | "outline";
  /** How labels are shown: tooltip only, always below icons, or below icons on mobile only */
  labelMode?: "tooltip" | "below" | "responsive";
  position?: "bottom" | "top";
  tooltipSide?: "top" | "bottom";
  className?: string;
}

const sizeConfig = {
  sm: { base: 32, pad: "px-2 py-1.5", gap: "gap-0.5", label: "text-[9px]" },
  md: { base: 40, pad: "px-2.5 py-2", gap: "gap-1", label: "text-[10px]" },
  lg: { base: 48, pad: "px-3 py-2.5", gap: "gap-1", label: "text-xs" },
};

const variantConfig = {
  default: "border-white/12 bg-ink/90",
  glass:
    "border-glass-border bg-glass backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]",
  outline: "border-white/20 bg-transparent",
};

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href) || href.endsWith(".pdf");
}

function scrollToHash(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : href;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function DockIcon({
  item,
  mouseX,
  magnification,
  distance,
  baseSize,
  labelClass,
  labelMode,
  tooltipSide,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  baseSize: number;
  labelClass: string;
  labelMode: "tooltip" | "below" | "responsive";
  tooltipSide: "top" | "bottom";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const showLabelAlways = labelMode === "below";
  const showLabelMobile = labelMode === "responsive";
  const enableTooltip = labelMode === "tooltip" || labelMode === "responsive";

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [baseSize, baseSize * magnification, baseSize]
  );

  const size = useSpring(sizeSync, {
    mass: 0.15,
    stiffness: 200,
    damping: 18,
  });

  const iconSize = useTransform(size, (s) => s * 0.5);

  const iconBubbleClass = cn(
    "relative flex aspect-square items-center justify-center rounded-full",
    "text-white/80",
    "transition-colors duration-150",
    "hover:bg-white/10 hover:text-accent-orange-soft",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange-soft/60"
  );

  const icon = (
    <motion.span
      className="pointer-events-none flex items-center justify-center [&>svg]:h-full [&>svg]:w-full"
      style={{ width: iconSize, height: iconSize }}
    >
      {item.icon}
    </motion.span>
  );

  const labelEl = (
    <>
      {showLabelAlways && (
        <span
          className={cn(
            "mt-0.5 max-w-18 truncate text-center font-medium leading-tight text-white/65",
            labelClass
          )}
        >
          {item.label}
        </span>
      )}
      {showLabelMobile && (
        <span
          className={cn(
            "mt-0.5 max-w-18 truncate text-center font-medium leading-tight text-white/65 md:hidden",
            labelClass
          )}
        >
          {item.label}
        </span>
      )}
    </>
  );

  const interactiveClass = cn(
    "flex cursor-pointer flex-col items-center justify-end outline-none",
    (showLabelAlways || showLabelMobile) && "min-w-[3.25rem] px-0.5"
  );

  const bubble = (
    <motion.span
      className={iconBubbleClass}
      style={{ width: size, height: size }}
    >
      {icon}
    </motion.span>
  );

  function handleActivate(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) {
    if (item.href?.startsWith("#")) {
      event.preventDefault();
      scrollToHash(item.href);
    }
    item.onClick?.();
  }

  const external = item.href ? isExternalHref(item.href) : false;

  const trigger = item.href ? (
    <a
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={handleActivate}
      aria-label={item.label}
      className={interactiveClass}
    >
      {bubble}
      {labelEl}
    </a>
  ) : (
    <button
      type="button"
      onClick={handleActivate}
      aria-label={item.label}
      className={interactiveClass}
    >
      {bubble}
      {labelEl}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      className="group relative flex items-end justify-center"
      style={
        showLabelAlways || showLabelMobile
          ? undefined
          : { width: size, height: size }
      }
    >
      {trigger}
      {enableTooltip && (
        <span
          role="tooltip"
          className={cn(
            "pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/12 bg-[#f5f2ec] px-2.5 py-1 text-xs font-medium text-ink opacity-0 shadow-lg transition-opacity duration-150",
            "group-hover:opacity-100 group-focus-within:opacity-100",
            tooltipSide === "top"
              ? "bottom-[calc(100%+0.5rem)]"
              : "top-[calc(100%+0.5rem)]",
            showLabelMobile && "hidden md:block"
          )}
        >
          {item.label}
        </span>
      )}
    </motion.div>
  );
}

export default function Dock({
  items,
  magnification = 1.35,
  distance = 100,
  size = "md",
  variant = "default",
  labelMode = "tooltip",
  position = "bottom",
  tooltipSide,
  className,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const config = sizeConfig[size];
  const resolvedTooltipSide =
    tooltipSide ?? (position === "top" ? "bottom" : "top");
  const isLabeled = labelMode === "below" || labelMode === "responsive";

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-fit w-max items-end border",
        isLabeled ? "rounded-2xl" : "rounded-full",
        config.pad,
        config.gap,
        variantConfig[variant],
        className
      )}
      role="toolbar"
      aria-label="Dock"
    >
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <DockIcon
            item={item}
            mouseX={mouseX}
            magnification={magnification}
            distance={distance}
            baseSize={config.base}
            labelClass={config.label}
            labelMode={labelMode}
            tooltipSide={resolvedTooltipSide}
          />
          {item.dividerAfter && (
            <div
              className={cn(
                "mx-1 w-px shrink-0 self-center bg-white/20",
                isLabeled ? "h-8" : "h-5"
              )}
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
}
