"use client";

import { useEffect, useState } from "react";
import SkillsCategoryOrbits from "./SkillsCategoryOrbits";
import SkillsConstellation from "./SkillsConstellation";

const DESKTOP_QUERY = "(min-width: 1024px)";

/** Mobile → SkillsCategoryOrbits. Desktop → SkillsConstellation. */
export default function SkillsShowcase() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);

    const update = () => setIsDesktop(desktopQuery.matches);
    update();

    desktopQuery.addEventListener("change", update);
    return () => desktopQuery.removeEventListener("change", update);
  }, []);

  return isDesktop ? <SkillsConstellation /> : <SkillsCategoryOrbits />;
}
