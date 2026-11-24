import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../src/components/GitHubProjects.tsx", import.meta.url),
  "utf8",
);

test("project filters announce the number of matching results", () => {
  assert.match(source, /role="group" aria-label="Filter projects by category"/);
  assert.match(source, /role="status" aria-live="polite" aria-atomic="true"/);
  assert.match(source, /aria-label="Project gallery"/);
});

test("carousel controls reflect their scroll boundaries", () => {
  assert.match(source, /disabled=\{!canMovePrevious\}/);
  assert.match(source, /disabled=\{!canMoveNext\}/);
  assert.match(source, /rail\.scrollWidth - rail\.clientWidth/);
  assert.match(source, /rail\.addEventListener\("scroll", updateControls/);
});

test("filter changes reset the gallery without forcing animation", () => {
  assert.match(source, /rail\.scrollTo\(\{ left: 0, behavior: "auto" \}\)/);
  assert.match(source, /behavior: getMotionSafeScrollBehavior\(\)/);
});
