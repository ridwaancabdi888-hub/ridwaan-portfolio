import { useEffect, useState } from "react";
import {
  getSectionPositions,
  selectSectionAtAnchor,
} from "../utils/activeSection.mjs";

const ACTIVE_SECTION_EVENT = "portfolio:active-section";

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibleRatios = new Map<string, number>();
    let navigationLockUntil = 0;
    let navigationTimer = 0;

    const updateFromVisibleSections = () => {
      if (performance.now() < navigationLockUntil) return;

      const visible = [...visibleRatios.entries()]
        .filter(([, ratio]) => ratio > 0)
        .sort((a, b) => b[1] - a[1]);

      if (visible[0]) setActiveId(visible[0][0]);
    };

    let observer: IntersectionObserver | null = null;
    let fallbackFrame = 0;

    const updateFromScrollPosition = () => {
      fallbackFrame = 0;
      if (performance.now() < navigationLockUntil) return;

      const activeSection = selectSectionAtAnchor(
        getSectionPositions(elements),
        window.innerHeight * 0.35,
      );
      if (activeSection) setActiveId(activeSection);
    };

    const scheduleScrollUpdate = () => {
      if (fallbackFrame) return;
      fallbackFrame = window.requestAnimationFrame(updateFromScrollPosition);
    };

    const updateFromNavigation = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (id && sectionIds.includes(id)) {
        navigationLockUntil = performance.now() + 900;
        setActiveId(id);
        window.clearTimeout(navigationTimer);
        navigationTimer = window.setTimeout(
          observer ? updateFromVisibleSections : updateFromScrollPosition,
          950,
        );
      }
    };

    window.addEventListener(ACTIVE_SECTION_EVENT, updateFromNavigation);

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleRatios.set(
              entry.target.id,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            );
          });
          updateFromVisibleSections();
        },
        {
          rootMargin: "-12% 0px -60% 0px",
          threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
        },
      );
      elements.forEach((element) => observer?.observe(element));
    } else {
      window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
      window.addEventListener("resize", scheduleScrollUpdate);
      updateFromScrollPosition();
    }

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(fallbackFrame);
      window.clearTimeout(navigationTimer);
      window.removeEventListener("scroll", scheduleScrollUpdate);
      window.removeEventListener("resize", scheduleScrollUpdate);
      window.removeEventListener(ACTIVE_SECTION_EVENT, updateFromNavigation);
    };
  }, [sectionIds]);

  return activeId;
}
