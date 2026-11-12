const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(matchMedia = globalThis.matchMedia) {
  return typeof matchMedia === "function" && matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function getMotionSafeScrollBehavior(matchMedia) {
  return prefersReducedMotion(matchMedia) ? "auto" : "smooth";
}
