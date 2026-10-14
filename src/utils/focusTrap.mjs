const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/** Return the interactive elements that can receive keyboard focus. */
export function getFocusableElements(container) {
  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
    (element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true",
  );
}

/**
 * Return a target only when Tab would leave the focus trap. The browser keeps
 * handling ordinary movement between the elements in the middle.
 */
export function getWrappedFocusTarget(elements, activeElement, shiftKey) {
  if (elements.length === 0) return null;

  const activeIndex = elements.indexOf(activeElement);
  if (activeIndex === -1) return shiftKey ? elements.at(-1) : elements[0];
  if (shiftKey && activeIndex === 0) return elements.at(-1);
  if (!shiftKey && activeIndex === elements.length - 1) return elements[0];
  return null;
}
