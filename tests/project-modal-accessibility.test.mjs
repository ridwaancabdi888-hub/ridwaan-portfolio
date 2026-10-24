import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../src/components/ProjectCard.tsx", import.meta.url),
  "utf8",
);

test("project modal keeps keyboard focus inside the dialog", () => {
  assert.match(source, /role="dialog"/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /getFocusableElements\(dialogRef\.current\)/);
  assert.match(source, /getWrappedFocusTarget\(/);
});

test("project modal restores focus to its opening control", () => {
  assert.match(source, /openerRef\.current = document\.activeElement/);
  assert.match(source, /openerRef\.current\?\.isConnected/);
  assert.match(source, /openerRef\.current\.focus\(\)/);
});
