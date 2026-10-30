/**
 * Pick the section nearest to the upper part of the viewport.
 *
 * The last section that has crossed the anchor wins. When the page is still
 * above every section, the first section remains active.
 */
export function selectSectionAtAnchor(sectionPositions, anchorY) {
  if (sectionPositions.length === 0) return "";

  let activeId = sectionPositions[0].id;
  for (const section of sectionPositions) {
    if (section.top > anchorY) break;
    activeId = section.id;
  }

  return activeId;
}

export function getSectionPositions(elements) {
  return elements
    .map((element) => ({ id: element.id, top: element.getBoundingClientRect().top }))
    .sort((a, b) => a.top - b.top);
}
