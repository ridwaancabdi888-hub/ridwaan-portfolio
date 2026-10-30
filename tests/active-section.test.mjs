import assert from "node:assert/strict";
import test from "node:test";
import {
  getSectionPositions,
  selectSectionAtAnchor,
} from "../src/utils/activeSection.mjs";

test("keeps the first section active above the document sections", () => {
  const sections = [
    { id: "home", top: 80 },
    { id: "about", top: 680 },
  ];

  assert.equal(selectSectionAtAnchor(sections, 20), "home");
});

test("selects the last section that crossed the viewport anchor", () => {
  const sections = [
    { id: "home", top: -700 },
    { id: "about", top: -40 },
    { id: "projects", top: 480 },
  ];

  assert.equal(selectSectionAtAnchor(sections, 240), "about");
});

test("selects the final section near the bottom of the page", () => {
  const sections = [
    { id: "projects", top: -900 },
    { id: "contact", top: 120 },
  ];

  assert.equal(selectSectionAtAnchor(sections, 240), "contact");
});

test("returns an empty id when no sections are available", () => {
  assert.equal(selectSectionAtAnchor([], 200), "");
});

test("reads and sorts live section positions", () => {
  const elements = [
    { id: "contact", getBoundingClientRect: () => ({ top: 500 }) },
    { id: "home", getBoundingClientRect: () => ({ top: -20 }) },
  ];

  assert.deepEqual(getSectionPositions(elements), [
    { id: "home", top: -20 },
    { id: "contact", top: 500 },
  ]);
});
