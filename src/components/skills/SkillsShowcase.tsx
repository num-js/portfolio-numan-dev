"use client";

import { useEffect, useState } from "react";
import SkillsCategoryOrbits from "./SkillsCategoryOrbits";
import SkillsConstellation from "./SkillsConstellation";

type DesktopVariant = "constellation" | "categories";

/** Mobile → SkillsCategoryOrbits. Desktop → one of the two, picked at random. */
export default function SkillsShowcase() {
  const [desktopVariant, setDesktopVariant] = useState<DesktopVariant | null>(
    null
  );

  useEffect(() => {
    setDesktopVariant(Math.random() < 0.5 ? "constellation" : "categories");
  }, []);

  return (
    <>
      <div className="lg:hidden">
        <SkillsCategoryOrbits />
      </div>
      <div className="hidden lg:block">
        {desktopVariant === "constellation" ? (
          <SkillsConstellation />
        ) : desktopVariant === "categories" ? (
          <SkillsCategoryOrbits />
        ) : null}
      </div>
    </>
  );
}
