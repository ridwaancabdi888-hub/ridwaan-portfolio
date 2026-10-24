import assert from "node:assert/strict";
import test from "node:test";

import {
  getFocusableElements,
  getWrappedFocusTarget,
} from "../src/utils/focusTrap.mjs";

const first = { id: "first" };
const middle = { id: "middle" };
const last = { id: "last" };
const elements = [first, middle, last];

test("Tab wraps from the final element to the first", () => {
  assert.equal(getWrappedFocusTarget(elements, last, false), first);
});

test("Shift+Tab wraps from the first element to the final one", () => {
  assert.equal(getWrappedFocusTarget(elements, first, true), last);
});

test("focus entering from outside starts at the correct edge", () => {
  assert.equal(getWrappedFocusTarget(elements, null, false), first);
  assert.equal(getWrappedFocusTarget(elements, null, true), last);
});

test("ordinary movement inside the trap remains browser-controlled", () => {
  assert.equal(getWrappedFocusTarget(elements, middle, false), null);
  assert.equal(getWrappedFocusTarget(elements, middle, true), null);
});

test("an empty focus trap has no target", () => {
  assert.equal(getWrappedFocusTarget([], null, false), null);
});

test("focusable elements exclude hidden and aria-hidden controls", () => {
  const visible = {
    hasAttribute: () => false,
    getAttribute: () => null,
  };
  const hidden = {
    hasAttribute: (name) => name === "hidden",
    getAttribute: () => null,
  };
  const ariaHidden = {
    hasAttribute: () => false,
    getAttribute: (name) => (name === "aria-hidden" ? "true" : null),
  };
  const container = {
    querySelectorAll: () => [visible, hidden, ariaHidden],
  };

  assert.deepEqual(getFocusableElements(container), [visible]);
});
