import {
  Code2,
  Server,
  LayoutGrid,
  Database,
  Boxes,
  Bot,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    description:
      "Building complete responsive applications with frontend interfaces, backend APIs, authentication and databases.",
    icon: Boxes,
  },
  {
    id: "system-development",
    title: "System Development",
    description:
      "Designing management systems for universities, businesses, pharmacies, municipalities and other organizations.",
    icon: Server,
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Creating responsive and accessible user interfaces using React, TypeScript, JavaScript and Tailwind CSS.",
    icon: LayoutGrid,
  },
  {
    id: "backend-api",
    title: "Backend and API Development",
    description:
      "Creating REST APIs, authentication, role-based permissions, database operations and server-side business logic.",
    icon: Code2,
  },
  {
    id: "database",
    title: "Database Development",
    description:
      "Designing and working with MySQL, MariaDB, MongoDB and structured application data.",
    icon: Database,
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description:
      "Writing structured and detailed prompts for AI coding assistants, software planning, debugging, documentation, automation and project development.",
    icon: Bot,
  },
];
