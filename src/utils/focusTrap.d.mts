export function getFocusableElements(container: ParentNode): HTMLElement[];

export function getWrappedFocusTarget(
  elements: HTMLElement[],
  activeElement: Element | null,
  shiftKey: boolean,
): HTMLElement | null;
