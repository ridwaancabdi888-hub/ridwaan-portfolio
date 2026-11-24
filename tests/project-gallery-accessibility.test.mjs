import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../src/components/projects/ProjectGallery.tsx", import.meta.url),
  "utf8",
);

test("project filters are a labelled group of toggle buttons", () => {
  assert.match(source, /role="group"\s+aria-label="Filter projects by category"/);
  assert.match(source, /aria-pressed=\{active\}/);
});

test("filter changes announce the number of matching results", () => {
  assert.match(source, /role="status" aria-live="polite" aria-atomic="true"/);
  assert.match(source, /aria-label="Project gallery"/);
});

test("duplicate cover buttons stay out of the tab order", () => {
  assert.match(source, /tabIndex=\{-1\}\s+aria-hidden="true"/);
});
