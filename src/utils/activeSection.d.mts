export type SectionPosition = {
  id: string;
  top: number;
};

export function selectSectionAtAnchor(
  sectionPositions: SectionPosition[],
  anchorY: number,
): string;

export function getSectionPositions(
  elements: HTMLElement[],
): SectionPosition[];
