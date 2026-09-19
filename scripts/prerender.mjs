// Injects server-rendered markup into dist/index.html after `vite build`.
// Runs as part of `npm run build`; no runtime server is involved.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = join(root, "dist", "index.html");
const ssrDir = join(root, "dist-ssr");

const { render } = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);
const appHtml = render();

const template = readFileSync(htmlPath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("prerender: #root marker not found in dist/index.html");
if (appHtml.length < 1000) throw new Error("prerender: rendered markup is unexpectedly small");

writeFileSync(htmlPath, template.replace(marker, () => `<div id="root">${appHtml}</div>`));
rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)} kB of static HTML into dist/index.html`);
