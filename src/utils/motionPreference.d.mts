export function prefersReducedMotion(
  matchMedia?: (query: string) => Pick<MediaQueryList, "matches">,
): boolean;

export function getMotionSafeScrollBehavior(
  matchMedia?: (query: string) => Pick<MediaQueryList, "matches">,
): ScrollBehavior;
