import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

// Lightweight static checks on the project catalogue (no TS loader needed).
const source = await readFile(new URL("../src/data/projects.ts", import.meta.url), "utf8");

// Private repositories must never get a public "Source" link.
const PRIVATE_REPOS = [
  "house-of-beauty",
  "riyaad-real-estate-3d",
  "kaafi-travel-agency",
  "riyaad-real-estate-management-system",
  "amber-oak-restaurant-system",
  "saffron-slate-restaurant-system",
];

test("no source links point at private repositories", () => {
  for (const repo of PRIVATE_REPOS) {
    assert.doesNotMatch(source, new RegExp(`\\$\\{GH\\}/${repo}\``), `${repo} is private`);
  }
});

test("every referenced screenshot exists in public/", () => {
  const images = [...source.matchAll(/image: "([^"]+)"/g)].map((m) => m[1]);
  assert.ok(images.length > 10);
  for (const image of images) {
    assert.ok(existsSync(new URL(`../public${image}`, import.meta.url)), `missing ${image}`);
  }
});

test("project ids are unique", () => {
  const ids = [...source.matchAll(/^\s{4}id: "([^"]+)"/gm)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length);
});

test("live links use https", () => {
  const urls = [...source.matchAll(/(?:liveUrl|url): "([^"]+)"/g)].map((m) => m[1]);
  for (const url of urls) assert.match(url, /^https:\/\//);
});
