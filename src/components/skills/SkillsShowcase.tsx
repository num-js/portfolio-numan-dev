import SkillsCategoryOrbits from "./SkillsCategoryOrbits";
import SkillsConstellation from "./SkillsConstellation";

/** Mobile → SkillsCategoryOrbits. Desktop → SkillsConstellation. */
export default function SkillsShowcase() {
  return (
    <>
      <div className="lg:hidden">
        <SkillsCategoryOrbits />
      </div>
      <div className="hidden lg:block">
        <SkillsConstellation />
      </div>
    </>
  );
}
