// Generates the favicon, Apple touch icon and the 1200x630 Open Graph image.
// Run locally with: npm run generate:brand  (outputs are committed, so the
// Vercel build never depends on system fonts being available).
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const cutout = join(root, "src", "assets", "images", "profile-cutout.png");

const BG = "#09090b";
const ACCENT = "#34d399";
const TEXT = "#f5f5f4";
const MUTED = "#a8a8b0";
const FONT = "Segoe UI, Inter, Helvetica, Arial, sans-serif";

const monogram = (size, radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="${radius}" fill="${BG}"/>
  <text x="31" y="42" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="27" letter-spacing="-1.5" fill="${TEXT}">RM</text>
  <rect x="46" y="38" width="5" height="5" rx="1" fill="${ACCENT}"/>
</svg>`;

writeFileSync(join(pub, "favicon.svg"), monogram(64, 14));
await sharp(Buffer.from(monogram(180, 0))).resize(180, 180).png().toFile(join(pub, "apple-touch-icon.png"));

const W = 1200;
const H = 630;
const esc = (s) => s.replace(/&/g, "&amp;");
const og = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="78%" cy="100%" r="60%"><stop offset="0" stop-color="${ACCENT}" stop-opacity=".30"/><stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#1d1d22" stroke-width="1"/></pattern>
  </defs>
  <rect width="100%" height="100%" fill="${BG}"/>
  <rect width="100%" height="100%" fill="url(#grid)" opacity=".6"/>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="72" y="120" font-family="${FONT}" font-size="22" font-weight="600" letter-spacing="4" fill="${ACCENT}">SOFTWARE ENGINEER · HARGEISA</text>
  <text x="72" y="205" font-family="${FONT}" font-size="64" font-weight="700" letter-spacing="-2" fill="${TEXT}">Ridwaan Apdirahman</text>
  <text x="72" y="278" font-family="${FONT}" font-size="64" font-weight="700" letter-spacing="-2" fill="${TEXT}">Mohamed</text>
  <text x="72" y="350" font-family="${FONT}" font-size="30" font-weight="500" fill="${MUTED}">${esc("Full-Stack Developer · Business Systems")}</text>
  <text x="72" y="392" font-family="${FONT}" font-size="30" font-weight="500" fill="${MUTED}">${esc("AI Integration · Database Design")}</text>
  <text x="72" y="540" font-family="${FONT}" font-size="22" fill="${MUTED}">ridwaan-portfolio.vercel.app</text>
</svg>`);

const portrait = await sharp(cutout).resize({ height: 560 }).toBuffer();
const { width: pw } = await sharp(portrait).metadata();
await sharp(og)
  .composite([{ input: portrait, left: W - pw - 40, top: H - 560 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(join(pub, "og-image.jpg"));

console.log("generate-brand-assets: favicon.svg, apple-touch-icon.png and og-image.jpg written");
