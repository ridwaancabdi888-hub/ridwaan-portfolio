import { useEffect, useState } from "react";

const ACTIVE_SECTION_EVENT = "portfolio:active-section";

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    let frameId = 0;

    const updateFromScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const activationLine = window.innerHeight * 0.32;
        let current = elements[0].id;

        for (const element of elements) {
          if (element.getBoundingClientRect().top <= activationLine) {
            current = element.id;
          } else {
            break;
          }
        }

        setActiveId(current);
      });
    };

    const updateFromNavigation = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (id && sectionIds.includes(id)) setActiveId(id);
    };

    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    window.addEventListener(ACTIVE_SECTION_EVENT, updateFromNavigation);
    updateFromScroll();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
      window.removeEventListener(ACTIVE_SECTION_EVENT, updateFromNavigation);
    };
  }, [sectionIds]);

  return activeId;
}
