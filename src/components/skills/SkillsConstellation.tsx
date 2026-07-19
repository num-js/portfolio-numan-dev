"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import OrbitCluster from "./OrbitCluster";
import SkillsGridFallback from "./SkillsGridFallback";
import { skillsContent } from "@/lib/skillsContent";

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function SkillsConstellation() {
  // SSR-safe default: render the plain grid until the client confirms
  // there's room (and motion tolerance) for the orbit layout.
  const [showOrbit, setShowOrbit] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const update = () => {
      setShowOrbit(desktopQuery.matches && !motionQuery.matches);
    };
    update();

    desktopQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      desktopQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!showOrbit) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rotateX = gsap.quickTo(wrapper, "rotationX", {
      duration: 1.1,
      ease: "power3.out",
    });
    const rotateY = gsap.quickTo(wrapper, "rotationY", {
      duration: 1.1,
      ease: "power3.out",
    });

    const handlePointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY(relX * 10);
      rotateX(relY * -10);
    };

    const handlePointerLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    wrapper.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      wrapper.removeEventListener("pointerleave", handlePointerLeave);
      gsap.set(wrapper, { rotationX: 0, rotationY: 0 });
    };
  }, [showOrbit]);

  if (!showOrbit) {
    return <SkillsGridFallback />;
  }

  return (
    <div className="[perspective:1600px]">
      <div
        ref={wrapperRef}
        className="grid grid-cols-3 gap-6 [transform-style:preserve-3d]"
      >
        {skillsContent.map((category, index) => (
          <OrbitCluster key={category.id} category={category} index={index} />
        ))}
      </div>
    </div>
  );
}
