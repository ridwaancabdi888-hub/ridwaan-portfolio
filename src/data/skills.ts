/**
 * Skills grouped by discipline. Each one is used in at least one project in
 * src/data/projects.ts (or in the project's repository), so the list stays honest.
 */
export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Responsive, accessible interfaces and installable PWAs.",
    skills: ["React 19", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "Vite", "HTML5 & CSS3", "Framer Motion", "GSAP", "PWA"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description: "Secure REST APIs, authentication and business logic.",
    skills: ["Node.js", "Express.js", "Next.js Route Handlers", "Python", "Flask", "PHP", "Laravel", "REST APIs", "JWT & sessions", "Role-based access control", "Zod validation"],
  },
  {
    id: "data",
    title: "Databases",
    description: "Relational schema design, security and reporting.",
    skills: ["PostgreSQL", "Supabase", "Row Level Security", "MySQL / MariaDB", "MongoDB", "SQLite", "SQLAlchemy", "Schema design", "Migrations", "Backup & restore"],
  },
  {
    id: "ai",
    title: "AI & Integration",
    description: "AI features in products, and AI agents in the workflow.",
    skills: ["OpenAI API", "Prompt engineering", "AI coding agents (Claude Code, Codex)", "Realtime (Supabase)", "Mobile-money integration design", "Maps & GIS (Leaflet)"],
  },
  {
    id: "mobile-3d",
    title: "Mobile & 3D",
    description: "Cross-platform apps and interactive 3D on the web.",
    skills: ["Flutter", "Dart", "Three.js", "GLB model optimization", "WordPress theme & plugin development"],
  },
  {
    id: "quality",
    title: "Quality & Delivery",
    description: "Testing, version control and production deployment.",
    skills: ["Git & GitHub", "Vercel", "Playwright", "Vitest", "PHPUnit", "Node test runner", "Accessibility (WCAG)", "SEO & structured data"],
  },
];
