export type SkillCategory = {
  id: string;
  title: string;
  skills: string[];
};

export const overallSkillLevel = "Advanced";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive Web Design",
      "Accessibility",
      "Vite",
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    skills: [
      "Node.js",
      "Express.js",
      "PHP",
      "Laravel",
      "REST APIs",
      "Authentication",
      "Authorization",
      "JWT",
      "Role-Based Access Control",
      "File Uploads",
      "Server-side validation",
    ],
  },
  {
    id: "database",
    title: "Database Development",
    skills: [
      "MySQL",
      "MariaDB",
      "MongoDB",
      "Mongoose",
      "SQL",
      "Database Design",
      "Data Relationships",
      "Backup and Restore",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    skills: [
      "Flutter",
      "Dart",
      "Material Design",
      "REST API Integration",
      "Mobile-money integration concepts",
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    skills: [
      "AI coding prompts",
      "System-development prompts",
      "Structured prompt design",
      "Debugging prompts",
      "Documentation prompts",
      "Requirement-analysis prompts",
      "Task decomposition",
      "AI-assisted development workflows",
    ],
  },
  {
    id: "testing",
    title: "Testing",
    skills: [
      "Jest",
      "PHPUnit",
      "Vitest",
      "Playwright",
      "API Testing",
      "Integration Testing",
      "Component Testing",
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    skills: [
      "Git",
      "GitHub",
      "Visual Studio Code",
      "Claude Code",
      "Codex",
      "npm",
      "Composer",
      "Postman",
      "Swagger/OpenAPI",
      "Docker",
      "Vercel",
      "Netlify",
      "GitHub Pages",
    ],
  },
  {
    id: "additional",
    title: "Additional Knowledge",
    skills: [
      "Python",
      "Java",
      "C++",
      "QGIS",
      "GIS",
      "Garmin GPS data",
      "Cisco Networking",
      "VLAN",
      "OSPF",
      "Software Documentation",
      "Microsoft Word",
      "Microsoft PowerPoint",
    ],
  },
];
