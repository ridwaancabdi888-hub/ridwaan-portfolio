export const personalInfo = {
  fullName: "Ridwaan Apdirahman Mohamed",
  shortName: "Ridwaan Mohamed",
  initials: "RM",
  title: "Software Engineer & Full-Stack Developer",
  focusAreas: [
    "Full-Stack Development",
    "Business Management Systems",
    "AI Integration",
    "Database Design",
    "Web Applications",
  ],
  location: "Hargeisa, Somaliland",
  university: "Gollis University",
  degree: "Bachelor of Software Engineering",
  studyPeriod: "2024–2027",
  email: "rfeeraari8@gmail.com",
  whatsappNumber: "+252 63 4199277",
  whatsappLink: "https://wa.me/252634199277",
  whatsappPrefilledMessage:
    "Hello Ridwaan, I visited your portfolio and would like to discuss a project or professional opportunity with you.",
  githubUsername: "ridwaancabdi888-hub",
  githubUrl: "https://github.com/ridwaancabdi888-hub",
  linkedinUsername: "ridwancabdi-9a7770341",
  linkedinUrl: "https://www.linkedin.com/in/ridwancabdi-9a7770341/",
  siteUrl: "https://ridwaan-portfolio.vercel.app/",
  resumePdfPath: "/resume/Ridwaan-Apdirahman-Mohamed-CV.pdf",

  availability: "Open to full-time roles, internships, freelance systems and collaboration.",

  headline: "I engineer business systems, web applications and AI-powered tools.",
  heroDescription:
    "Software engineer based in Hargeisa, Somaliland. I design databases, build full-stack applications and integrate AI — from management systems that run real businesses to fast, bilingual websites that win them customers.",

  bio: [
    "I'm Ridwaan Apdirahman Mohamed, a software engineer and full-stack developer studying for a Bachelor of Software Engineering at Gollis University in Hargeisa, Somaliland.",
    "Most of my work is software that businesses use every day: property and rental management for a real-estate company, a cafeteria POS with QR ordering and a kitchen display, spare-parts inventory, multi-tenant gym and school platforms, restaurant systems and a municipal tax and property platform with GIS mapping. I design the database, build the API and the interface, secure it with roles and row-level security, and ship it to production.",
    "I also build AI-powered applications — like an interview coach that generates role-specific questions and coaching with the OpenAI API — and I use AI coding agents such as Claude Code and Codex as part of a disciplined workflow with code review and automated tests.",
  ],

  facts: [
    { label: "Based in", value: "Hargeisa, Somaliland" },
    { label: "Education", value: "BSc Software Engineering · Gollis University (2024–2027)" },
    { label: "Focus", value: "Business systems · Full-stack web · AI integration" },
    { label: "Languages", value: "Somali (native) · English (good working proficiency)" },
  ],
} as const;

export type PersonalInfo = typeof personalInfo;
