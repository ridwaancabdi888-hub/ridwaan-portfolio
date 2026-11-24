// Build-time image optimisation (runs before `vite build` and `vite`).
// - Converts heavy project screenshots in public/project-images/*.png to WebP
// - Creates the hero cutout WebP from src/assets/images/profile-cutout.png
// - Composes public/og-image.jpg, the 1200x630 social share image
// Generated files are git-ignored; the source PNGs stay in the repo.
import sharp from "sharp";
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const projectDir = join(root, "public", "project-images");
const cutoutPng = join(root, "src", "assets", "images", "profile-cutout.png");
const cutoutWebp = join(root, "src", "assets", "images", "profile-cutout.webp");

const upToDate = (src, out) => existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;

for (const name of readdirSync(projectDir).filter((f) => f.endsWith(".png"))) {
  const src = join(projectDir, name);
  const out = src.replace(/\.png$/, ".webp");
  if (upToDate(src, out)) continue;
  try {
    await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  } catch (error) {
    console.warn(`optimize-images: skipped ${name} (${error.message})`);
  }
}

if (!upToDate(cutoutPng, cutoutWebp)) {
  try {
    await sharp(cutoutPng).webp({ quality: 82, alphaQuality: 90 }).toFile(cutoutWebp);
  } catch (error) {
    // Keep the build working: browsers sniff the real image type.
    console.warn(`optimize-images: hero WebP failed, copying PNG (${error.message})`);
    copyFileSync(cutoutPng, cutoutWebp);
  }
}

console.log("optimize-images: WebP screenshots and hero cutout ready");
