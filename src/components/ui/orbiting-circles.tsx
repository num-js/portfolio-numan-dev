'use client';
import { useState, useRef, type ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface OrbitItem {
  id?: string;
  title?: string;
  icon: ReactNode;
  className?: string;
}

interface OrbitRing {
  radius: number;
  items: OrbitItem[];
  duration?: number;
  reverse?: boolean;
  initialRotation?: number;
}

interface OrbitingCirclesProps {
  rings?: OrbitRing[];
  centerContent?: ReactNode;
  pauseOnHover?: boolean;
  className?: string;
  showOrbits?: boolean;
  orbitClassName?: string;
}

const defaultRings: OrbitRing[] = [
  {
    radius: 80,
    duration: 20,
    items: [
      { id: 'item-1', title: 'Item 1', icon: <div className="w-8 h-8 rounded-full bg-white/20" /> },
      { id: 'item-2', title: 'Item 2', icon: <div className="w-8 h-8 rounded-full bg-white/20" /> },
    ],
  },
];

export default function OrbitingCircles({
  rings = defaultRings,
  centerContent,
  pauseOnHover = true,
  className = '',
  showOrbits = true,
  orbitClassName = '',
}: OrbitingCirclesProps) {
  const [pausedRingIndex, setPausedRingIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const safeRings = rings && rings.length > 0 ? rings : defaultRings;
  const maxRadius = Math.max(...safeRings.map((r) => r.radius));

  return (
    <TooltipProvider delayDuration={100}>
      <div
        ref={containerRef}
        className={`relative ${className}`}
        style={{ width: maxRadius * 2 + 80, height: maxRadius * 2 + 80 }}
        tabIndex={0}
      >
      {centerContent && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          {centerContent}
        </div>
      )}

      {safeRings.map((ring, ringIndex) => {
        const { radius, items, duration = 20, reverse = false, initialRotation = 0 } = ring;
        const direction = reverse ? 'reverse' : 'normal';
        const isThisRingPaused = pauseOnHover && pausedRingIndex === ringIndex;
        // Offset the animation timeline instead of setting a conflicting inline transform.
        const startDelay =
          initialRotation !== 0 ? `${(-(initialRotation / 360) * duration).toFixed(4)}s` : undefined;

        return (
          <div
            key={ringIndex}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: radius * 2, height: radius * 2 }}
          >
            {showOrbits && (
              <div
                className={cn(
                  'absolute inset-0 rounded-full border transition-colors duration-300',
                  isThisRingPaused
                    ? 'border-accent-orange-soft/70'
                    : 'border-accent-orange-soft/40',
                  orbitClassName
                )}
              />
            )}

            <div
              className="absolute inset-0"
              style={{
                animationName: 'orbit-spin',
                animationDuration: `${duration}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDirection: direction,
                animationPlayState: isThisRingPaused ? 'paused' : 'running',
                animationDelay: startDelay,
              }}
            >
              {items.map((item, itemIndex) => {
                // Pure CSS placement — identical strings on server and client (no cos/sin).
                const angle = ((360 / items.length) * itemIndex).toFixed(4);
                const counterAngle = (-Number(angle)).toFixed(4);

                const iconContent = (
                  <div
                    className={`flex cursor-pointer items-center justify-center ${
                      isThisRingPaused ? 'scale-110' : ''
                    } ${item.className || ''}`}
                    style={{
                      animationName: 'orbit-spin',
                      animationDuration: `${duration}s`,
                      animationTimingFunction: 'linear',
                      animationIterationCount: 'infinite',
                      animationDirection: reverse ? 'normal' : 'reverse',
                      animationPlayState: isThisRingPaused ? 'paused' : 'running',
                      animationDelay: startDelay,
                    }}
                  >
                    {item.icon}
                  </div>
                );

                return (
                  <div
                    key={item.id || itemIndex}
                    className="pointer-events-auto absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(${counterAngle}deg)`,
                    }}
                    onMouseEnter={() => pauseOnHover && setPausedRingIndex(ringIndex)}
                    onMouseLeave={() => pauseOnHover && setPausedRingIndex(null)}
                  >
                    {item.title ? (
                      <Tooltip>
                        <TooltipTrigger>{iconContent}</TooltipTrigger>
                        <TooltipContent side="top">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      iconContent
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      </div>
    </TooltipProvider>
  );
}
