// Generates abstract, clearly-not-a-screenshot cover art for each featured
// project (no real product screenshots exist yet — see src/data/projects.ts).
// Run with: npm run generate:covers
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "project-images");

// Matches the ProjectCard image container's real aspect ratio (~2.1:1)
// closely, so object-cover doesn't crop the icon or the disclaimer text.
const W = 960;
const H = 460;

// Site's own design tokens (src/index.css), kept in sync by hand.
const BG = "#05070d";
const SURFACE = "#0d1220";
const BORDER = "#1c2436";
const ACCENT = "#3b82f6";
const CYAN = "#22d3ee";
const TEXT = "#eef2f9";
const TEXT_MUTED = "#8b96ad";

function gridPattern(id) {
  return `
    <pattern id="${id}" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="${BORDER}" stroke-width="1" opacity="0.55"/>
    </pattern>
  `;
}

function baseDefs(id, glowColor) {
  return `
    <defs>
      ${gridPattern(`grid-${id}`)}
      <radialGradient id="glow-${id}" cx="50%" cy="38%" r="60%">
        <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${glowColor}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="fade-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="60%" stop-color="${BG}" stop-opacity="0"/>
        <stop offset="100%" stop-color="${BG}" stop-opacity="0.9"/>
      </linearGradient>
      <mask id="mask-${id}">
        <rect width="${W}" height="${H}" fill="white"/>
        <rect width="${W}" height="${H}" fill="url(#fade-edges-${id})"/>
      </mask>
      <radialGradient id="fade-edges-${id}" cx="50%" cy="42%" r="65%">
        <stop offset="70%" stop-color="black" stop-opacity="0"/>
        <stop offset="100%" stop-color="black" stop-opacity="0.55"/>
      </radialGradient>
    </defs>
  `;
}

function background(id) {
  return `
    <rect width="${W}" height="${H}" fill="${BG}"/>
    <rect width="${W}" height="${H}" fill="url(#grid-${id})" mask="url(#mask-${id})"/>
    <rect width="${W}" height="${H}" fill="url(#glow-${id})"/>
  `;
}

function tag(x, y, label, color) {
  const w = label.length * 8.2 + 34;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="30" rx="15" fill="${SURFACE}" stroke="${BORDER}"/>
    <circle cx="${x + 16}" cy="${y + 15}" r="4" fill="${color}"/>
    <text x="${x + 28}" y="${y + 20}" font-family="Consolas, monospace" font-size="13" fill="${TEXT_MUTED}" letter-spacing="0.3">${label}</text>
  `;
}

const ICON_STROKE = { stroke: TEXT, "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round", fill: "none" };
const attrs = (o) => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(" ");

// --- Icon glyphs, hand-drawn, ~120x120 viewBox, centered via <g transform> ---

function iconPropertyTax(cx, cy, scale, color) {
  // Map pin with a small grid/plot inside — GIS / property mapping motif.
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <circle r="70" fill="${SURFACE}" stroke="${BORDER}" stroke-width="1.5"/>
      <path d="M0 -34 C20 -34 34 -20 34 0 C34 24 0 48 0 48 C0 48 -34 24 -34 0 C-34 -20 -20 -34 0 -34 Z" ${attrs({ stroke: color, "stroke-width": 3.4, fill: "none", "stroke-linejoin": "round" })}/>
      <rect x="-14" y="-16" width="28" height="24" rx="2" ${attrs({ stroke: color, "stroke-width": 2.6, fill: "none" })}/>
      <line x1="-14" y1="-4" x2="14" y2="-4" ${attrs({ stroke: color, "stroke-width": 2 })}/>
      <line x1="0" y1="-16" x2="0" y2="8" ${attrs({ stroke: color, "stroke-width": 2 })}/>
    </g>
  `;
}

function iconHostel(cx, cy, scale, color) {
  // Graduation cap over a small dormitory block — university housing motif.
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <circle r="70" fill="${SURFACE}" stroke="${BORDER}" stroke-width="1.5"/>
      <path d="M-38 -14 L0 -30 L38 -14 L0 2 Z" ${attrs({ stroke: color, "stroke-width": 3.2, fill: "none", "stroke-linejoin": "round" })}/>
      <line x1="30" y1="-10" x2="30" y2="10" ${attrs({ stroke: color, "stroke-width": 2.6 })}/>
      <path d="M-18 -2 L-18 14 C-18 20 18 20 18 14 L18 -2" ${attrs({ stroke: color, "stroke-width": 2.6, fill: "none" })}/>
      <rect x="-30" y="24" width="60" height="24" rx="2" ${attrs({ stroke: color, "stroke-width": 2.6, fill: "none" })}/>
      <line x1="-16" y1="30" x2="-16" y2="48" ${attrs({ stroke: color, "stroke-width": 1.8 })}/>
      <line x1="0" y1="30" x2="0" y2="48" ${attrs({ stroke: color, "stroke-width": 1.8 })}/>
      <line x1="16" y1="30" x2="16" y2="48" ${attrs({ stroke: color, "stroke-width": 1.8 })}/>
    </g>
  `;
}

function iconPharmacy(cx, cy, scale, color) {
  // Smartphone with a pulse/heartbeat line — mobile health/e-pharmacy motif.
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <circle r="70" fill="${SURFACE}" stroke="${BORDER}" stroke-width="1.5"/>
      <rect x="-26" y="-44" width="52" height="88" rx="10" ${attrs({ stroke: color, "stroke-width": 3.2, fill: "none" })}/>
      <line x1="-10" y1="-36" x2="10" y2="-36" ${attrs({ stroke: color, "stroke-width": 2.4 })}/>
      <polyline points="-16,4 -6,4 -1,-10 6,18 12,4 18,4" ${attrs({ stroke: color, "stroke-width": 2.8, fill: "none" })}/>
      <line x1="-10" y1="32" x2="10" y2="32" ${attrs({ stroke: color, "stroke-width": 3, "stroke-linecap": "round" })}/>
    </g>
  `;
}

const projects = [
  {
    file: "hargeisa-tax-system.webp",
    eyebrow: "System Development",
    title: "Hargeisa Municipal",
    title2: "Tax &amp; Property System",
    tags: ["React · Node.js", "MySQL · GIS"],
    color: ACCENT,
    icon: iconPropertyTax,
  },
  {
    file: "hostel-management.webp",
    eyebrow: "Laravel · System Development",
    title: "University Hostel",
    title2: "Management System",
    tags: ["Laravel 12", "MySQL"],
    color: CYAN,
    icon: iconHostel,
  },
  {
    file: "epharmacy.webp",
    eyebrow: "Mobile · Full-Stack",
    title: "Zaad/e-Dahab",
    title2: "E-Pharmacy",
    tags: ["Flutter", "Node.js · MongoDB"],
    color: ACCENT,
    icon: iconPharmacy,
  },
];

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  for (const project of projects) {
    const id = project.file.replace(/\W/g, "");
    const svg = `
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
        ${baseDefs(id, project.color)}
        ${background(id)}
        <rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke="${BORDER}" stroke-width="2"/>

        ${project.icon(W / 2, 148, 0.88, project.color)}

        <text x="${W / 2}" y="278" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="32" fill="${TEXT}">${project.title}</text>
        <text x="${W / 2}" y="315" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="32" fill="${TEXT}">${project.title2}</text>

        <g transform="translate(${W / 2 - 140} 346)">
          ${tag(0, 0, project.tags[0], project.color)}
        </g>
        <g transform="translate(${W / 2 + 10} 346)">
          ${tag(0, 0, project.tags[1], project.color)}
        </g>

        <text x="${W / 2}" y="412" text-anchor="middle" font-family="Consolas, monospace" font-size="12" letter-spacing="2" fill="${TEXT_MUTED}">CONCEPT COVER — NOT A LIVE SCREENSHOT</text>
      </svg>
    `;

    await sharp(Buffer.from(svg)).webp({ quality: 92 }).toFile(join(OUT_DIR, project.file));
    console.log(`Wrote ${project.file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
