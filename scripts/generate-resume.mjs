// Generates the one-page PDF CV shown in the Resume section and linked
// from every "Download CV" button. Run with: npm run generate:resume
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import { createWriteStream } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "resume");
const outFile = join(outDir, "Ridwaan-Apdirahman-Mohamed-CV.pdf");

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const ACCENT = "#2563eb";
const TEXT = "#111827";
const MUTED = "#6b7280";
const BORDER = "#d1d5db";

const doc = new PDFDocument({ size: "A4", margins: { top: 44, bottom: 44, left: 50, right: 50 } });
doc.pipe(createWriteStream(outFile));

const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

function heading(text) {
  doc.moveDown(0.6);
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(ACCENT)
    .text(text.toUpperCase(), { characterSpacing: 1 });
  const y = doc.y + 2;
  doc.moveTo(doc.page.margins.left, y).lineTo(doc.page.margins.left + pageWidth, y).strokeColor(BORDER).lineWidth(0.75).stroke();
  doc.moveDown(0.5);
}

function bullet(text) {
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEXT)
    .text(`•  ${text}`, { indent: 4, lineGap: 1 });
}

// Header
doc.font("Helvetica-Bold").fontSize(22).fillColor(TEXT).text("Ridwaan Apdirahman Mohamed");
doc
  .font("Helvetica")
  .fontSize(11)
  .fillColor(ACCENT)
  .text("Software Engineer · Full-Stack Developer · Business Systems · AI Integration");

doc.moveDown(0.4);
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(MUTED)
  .text(
    "Hargeisa, Somaliland   |   rfeeraari8@gmail.com   |   +252 63 4199277   |   github.com/ridwaancabdi888-hub   |   linkedin.com/in/ridwancabdi-9a7770341",
    { lineGap: 2 },
  );

heading("Professional Summary");
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor(TEXT)
  .text(
    "Software engineer and full-stack developer who designs, builds and deploys business management systems, web applications and AI-integrated products. Shipped production systems for real-estate, hospitality, retail and municipal use cases — covering database design, secure APIs, role-based access, row-level security and responsive, bilingual (Somali/English) interfaces. Currently completing a Bachelor of Software Engineering at Gollis University.",
    { lineGap: 2, align: "justify" },
  );

heading("Education");
doc.font("Helvetica-Bold").fontSize(10).fillColor(TEXT).text("Bachelor of Software Engineering", { continued: true });
doc.font("Helvetica").fontSize(9.5).fillColor(MUTED).text("   —   Gollis University   (2024–2027)");
doc.font("Helvetica-Bold").fontSize(10).fillColor(TEXT).text("Form 4 Completed");

heading("Core Skills");
const coreSkills = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express.js", "Python / Flask", "PHP / Laravel",
  "PostgreSQL", "Supabase", "MySQL", "MongoDB", "Tailwind CSS", "OpenAI API", "Flutter", "Three.js",
  "REST APIs", "RBAC & RLS", "Playwright / Vitest", "Git & GitHub", "Vercel",
];
doc.font("Helvetica").fontSize(9.5).fillColor(TEXT).text(coreSkills.join("   •   "), { lineGap: 3 });

heading("Selected Projects");
bullet("Riyaad Real Estate Management System — properties, sales, rentals, CRM, RBAC (Next.js, Supabase, PostgreSQL)");
bullet("SANDBOX Cafeteria System — QR ordering, kitchen display, POS, realtime (Next.js, Supabase)");
bullet("AI Interview Coach — AI questions and coaching, voice mode (Next.js, OpenAI API, Supabase)");
bullet("Hargeisa Municipal Tax & Property System — GIS, analytics, audit log (React, Express, MySQL)");
bullet("Kaafiye Spare Parts — inventory, POS and service records PWA (Next.js, Supabase)");
bullet("Riyaad Real Estate 3D Website — interactive Three.js showroom, WordPress back office");
bullet("GYM & School Management SaaS — multi-tenant platforms (Node.js, Express, PostgreSQL)");
doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Live demos and source: ridwaan-portfolio.vercel.app", { lineGap: 1 });

const colTop = doc.y + 8;
const colWidth = pageWidth / 2 - 10;

doc.y = colTop;
doc.x = doc.page.margins.left;
heading("Languages");
doc.font("Helvetica").fontSize(9.5).fillColor(TEXT).text("Somali: Native", { width: colWidth });
doc.text("English: Good working proficiency", { width: colWidth });
const leftBottom = doc.y;

doc.y = colTop;
doc.x = doc.page.margins.left + colWidth + 20;
heading("Professional Interests");
[
  "Business Management Systems", "Full-Stack Development", "AI Integration", "Mobile Development",
  "Database Systems", "Networking", "GIS and Mapping", "Artificial Intelligence",
].forEach((interest) => {
  doc.font("Helvetica").fontSize(9.5).fillColor(TEXT).text(interest, { width: colWidth });
});

doc.x = doc.page.margins.left;
doc.y = Math.max(leftBottom, doc.y);

doc.end();

doc.on("finish", () => {
  console.log(`Resume PDF generated at ${outFile}`);
});
