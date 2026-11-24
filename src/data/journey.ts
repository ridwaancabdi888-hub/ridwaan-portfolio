/**
 * Development journey. Dates come from repository creation / deployment
 * history on GitHub — this is a record of work shipped, not an employment history.
 */
export type JourneyEntry = {
  period: string;
  title: string;
  description: string;
  highlights: string[];
};

export const journey: JourneyEntry[] = [
  {
    period: "Oct – Nov 2026",
    title: "Production systems for local businesses",
    description:
      "Designed and shipped software for real companies in Hargeisa — internal systems, public websites and online stores, Somali-first and bilingual.",
    highlights: [
      "Riyaad Real Estate management system + 3D website",
      "Kaafiye spare-parts inventory & POS",
      "Kaafi Travel Agency, House of Beauty, Beersan store",
    ],
  },
  {
    period: "Aug – Sep 2026",
    title: "Multi-tenant SaaS and real-time POS",
    description:
      "Moved to SaaS architecture: tenant isolation, subscriptions, realtime order flows and decimal-safe checkout.",
    highlights: [
      "GYM and School management SaaS platforms",
      "SANDBOX cafeteria POS with QR ordering and kitchen display",
      "Amber & Oak and Saffron & Slate restaurant systems (Flask)",
    ],
  },
  {
    period: "Jun – Jul 2026",
    title: "Full-stack systems and AI",
    description:
      "Built database-driven systems end to end — APIs, authentication, roles, GIS — and my first AI product.",
    highlights: [
      "Hargeisa Municipal Tax & Property System (React, Express, MySQL, GIS)",
      "Zaad/e-Dahab E-Pharmacy (Flutter, Node.js, MongoDB, React)",
      "AI Interview Coach (Next.js, OpenAI API, Supabase)",
      "Learn Python platform, DALXIIS guide, Ramad Construction redesign",
    ],
  },
  {
    period: "May 2026",
    title: "First public projects",
    description:
      "Started publishing work on GitHub with responsive company websites and front-end projects.",
    highlights: ["RAMAD Construction company website (GitHub Pages)"],
  },
  {
    period: "2024 – 2027",
    title: "BSc Software Engineering — Gollis University",
    description:
      "Studying programming, database systems, software engineering, system analysis and design, networking and operating systems.",
    highlights: ["Hargeisa, Somaliland · expected graduation 2027"],
  },
];
