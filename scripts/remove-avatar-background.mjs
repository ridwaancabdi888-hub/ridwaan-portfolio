// Removes the solid-color studio backdrop from the source headshot and
// writes a transparent cutout used by the Hero section. Chroma-key based
// (not ML matting) because the source background is a flat, near-uniform
// color — that gives cleaner hair-edge detail than a generic matting model.
// Run with: npm run process:avatar
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "src", "assets", "images", "avatar-original.png");
const OUT = join(__dirname, "..", "src", "assets", "images", "profile-cutout.png");

// Distance (in RGB units) below which a pixel is treated as pure
// background, and above which it's treated as pure subject. Pixels in
// between get a smooth alpha ramp for anti-aliased edges.
const INNER_THRESHOLD = 45;
const OUTER_THRESHOLD = 100;

function sampleBackgroundColor(data, info) {
  const { width, height, channels } = info;
  const patch = 14;
  let r = 0, g = 0, b = 0, n = 0;

  const addPixel = (x, y) => {
    const idx = (y * width + x) * channels;
    r += data[idx];
    g += data[idx + 1];
    b += data[idx + 2];
    n++;
  };

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < patch; y++) addPixel(x, y);
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < patch; x++) addPixel(x, y);
    for (let x = width - patch; x < width; x++) addPixel(x, y);
  }

  return { r: r / n, g: g / n, b: b / n };
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

async function main() {
  const outDir = dirname(OUT);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const bg = sampleBackgroundColor(data, info);
  console.log(`Sampled background color: rgb(${bg.r.toFixed(0)}, ${bg.g.toFixed(0)}, ${bg.b.toFixed(0)})`);

  const out = Buffer.from(data);

  for (let i = 0; i < width * height; i++) {
    const idx = i * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const dist = Math.sqrt((r - bg.r) ** 2 + (g - bg.g) ** 2 + (b - bg.b) ** 2);
    const alpha = smoothstep(INNER_THRESHOLD, OUTER_THRESHOLD, dist);

    // Spill suppression: at partially-transparent edge pixels, pull the
    // color away from the backdrop hue so hair edges don't keep a blue
    // fringe once composited onto the dark site background.
    if (alpha < 1) {
      const pull = 1 - alpha;
      out[idx] = r + (r - bg.r) * pull * 0.4;
      out[idx + 1] = g + (g - bg.g) * pull * 0.4;
      out[idx + 2] = b + (b - bg.b) * pull * 0.4;
    }

    out[idx + 3] = Math.round(alpha * 255);
  }

  // Compute a tight bounding box around non-transparent pixels ourselves —
  // sharp's .trim() looks at the corner color rather than the alpha
  // channel, so it doesn't crop a chroma-keyed cutout reliably.
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = out[(y * width + x) * channels + 3];
      if (a > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const pad = 6;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const cropWidth = Math.min(width, maxX + pad) - left;
  const cropHeight = Math.min(height, maxY + pad) - top;

  await sharp(out, { raw: { width, height, channels } })
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .png()
    .toFile(OUT);

  console.log(`Wrote transparent cutout (${cropWidth}x${cropHeight}) to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
