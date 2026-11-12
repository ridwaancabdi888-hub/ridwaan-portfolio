import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  getMotionSafeScrollBehavior,
  prefersReducedMotion,
} from "../src/utils/motionPreference.mjs";

const createMatchMedia = (matches) => (query) => ({
  matches,
  media: query,
});

test("uses instant scrolling when reduced motion is requested", () => {
  const matchMedia = createMatchMedia(true);

  assert.equal(prefersReducedMotion(matchMedia), true);
  assert.equal(getMotionSafeScrollBehavior(matchMedia), "auto");
});

test("keeps smooth scrolling when reduced motion is not requested", () => {
  const matchMedia = createMatchMedia(false);

  assert.equal(prefersReducedMotion(matchMedia), false);
  assert.equal(getMotionSafeScrollBehavior(matchMedia), "smooth");
});

test("falls back safely when matchMedia is unavailable", () => {
  assert.equal(prefersReducedMotion(undefined), false);
  assert.equal(getMotionSafeScrollBehavior(undefined), "smooth");
});

test("configures Framer Motion to honor the operating-system preference", async () => {
  const appSource = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");

  assert.match(appSource, /<MotionConfig reducedMotion="user">/);
});
