import { useEffect, useState } from "react";

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        updateFromVisibleSections();
      },
      {
        rootMargin: "-12% 0px -60% 0px",
        threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
      },
    );

    const updateFromNavigation = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (id && sectionIds.includes(id)) {
        navigationLockUntil = performance.now() + 900;
        setActiveId(id);
        window.clearTimeout(navigationTimer);
        navigationTimer = window.setTimeout(updateFromVisibleSections, 950);
      }
    };

    window.addEventListener(ACTIVE_SECTION_EVENT, updateFromNavigation);
    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      window.clearTimeout(navigationTimer);
      window.removeEventListener(ACTIVE_SECTION_EVENT, updateFromNavigation);
    };
  }, [sectionIds]);

  return activeId;
}
