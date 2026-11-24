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
  .text("Full-Stack Web Developer · System Developer · Prompt Engineer · Software Engineering Student");

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
    "Advanced Full-Stack Web Developer, System Developer, Prompt Engineer and Software Engineering student with practical experience building responsive interfaces, REST APIs, database-driven applications and complete management systems. Experienced in organizing software requirements, designing systems and using AI coding tools through structured prompt engineering. Interested in web development, mobile applications, networking, GIS and modern software technologies.",
    { lineGap: 2, align: "justify" },
  );

heading("Education");
doc.font("Helvetica-Bold").fontSize(10).fillColor(TEXT).text("Bachelor of Software Engineering", { continued: true });
doc.font("Helvetica").fontSize(9.5).fillColor(MUTED).text("   —   Gollis University   (2023–2027)");
doc.font("Helvetica-Bold").fontSize(10).fillColor(TEXT).text("Form 4 Completed");

heading("Core Skills");
const coreSkills = [
  "Full-Stack Web Development", "System Development", "Prompt Engineering", "React", "TypeScript",
  "JavaScript", "Tailwind CSS", "Node.js", "Express.js", "PHP", "Laravel", "MySQL", "MariaDB",
  "MongoDB", "Flutter", "REST APIs", "Git and GitHub",
];
doc.font("Helvetica").fontSize(9.5).fillColor(TEXT).text(coreSkills.join("   •   "), { lineGap: 3 });

heading("Selected Projects");
bullet("Hargeisa Municipal Tax & Property Management System — React, Node.js, Express.js, MySQL, GIS mapping");
bullet("University Hostel Management System — PHP, Laravel 12, Blade, Tailwind CSS, MySQL");
bullet("Zaad/e-Dahab E-Pharmacy — Flutter, Node.js, Express.js, MongoDB, React");

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
  "Full-Stack Web Development", "System Development", "Prompt Engineering", "Mobile Development",
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
