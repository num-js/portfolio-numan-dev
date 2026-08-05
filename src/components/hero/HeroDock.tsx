"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  FileDown,
} from "lucide-react";
import Dock, { type DockItem } from "@/components/ui/dock";
import { heroContent } from "@/lib/heroContent";

const BASE_BOTTOM_PX = 24;

const dockItems: DockItem[] = [
  {
    id: "experience",
    icon: <BriefcaseBusiness strokeWidth={1.75} />,
    label: "Experience",
    href: "#experience",
  },
  {
    id: "skills",
    icon: <Code2 strokeWidth={1.75} />,
    label: "Skills",
    href: "#skills",
  },
  {
    id: "projects",
    icon: <FolderKanban strokeWidth={1.75} />,
    label: "Projects",
    href: "#projects",
  },
  {
    id: "academics",
    icon: <GraduationCap strokeWidth={1.75} />,
    label: "Academics",
    href: "#academics",
    dividerAfter: true,
  },
  {
    id: "resume",
    icon: <FileDown strokeWidth={1.75} />,
    label: heroContent.resumeLabel,
    href: heroContent.resumeHref,
  },
];

export default function HeroDock() {
  const [bottomPx, setBottomPx] = useState(BASE_BOTTOM_PX);

  // Keep the dock inside the *visual* viewport on mobile. Before scroll,
  // browser chrome shrinks the visible area while fixed bottom still
  // anchors to the larger layout viewport — which clips the dock.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    function syncBottom() {
      const viewport = window.visualViewport;
      if (!viewport) return;
      const chromeOffset = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop
      );
      setBottomPx(BASE_BOTTOM_PX + chromeOffset);
    }

    syncBottom();
    vv.addEventListener("resize", syncBottom);
    vv.addEventListener("scroll", syncBottom);
    window.addEventListener("resize", syncBottom);

    return () => {
      vv.removeEventListener("resize", syncBottom);
      vv.removeEventListener("scroll", syncBottom);
      window.removeEventListener("resize", syncBottom);
    };
  }, []);

  return (
    <div
      className="fixed left-1/2 z-50 w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2 pb-[env(safe-area-inset-bottom,0px)]"
      style={{ bottom: bottomPx }}
    >
      <Dock
        items={dockItems}
        variant="glass"
        size="md"
        position="bottom"
        labelMode="responsive"
        magnification={1.45}
        className="pointer-events-auto"
      />
    </div>
  );
}
