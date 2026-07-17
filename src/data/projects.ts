export type ProjectCategory =
  | "all"
  | "full-stack"
  | "frontend"
  | "backend"
  | "mobile"
  | "system"
  | "wip";

export type LocalProject = {
  id: string;
  title: string;
  repo: string;
  category: Exclude<ProjectCategory, "all">;
  description: string;
  technologies: string[];
  status: "Major project" | "Work in progress";
  featured: boolean;
  /**
   * No confirmed real screenshots exist for these repositories yet, so
   * these currently point at generated "concept cover" art (see
   * scripts/generate-project-covers.mjs) — each one says so directly on
   * the image, and `ProjectCard`'s alt text calls it "cover art", never
   * "screenshot". `ProjectCard` treats a missing/failed image load as
   * "no cover available" and falls back to an inline icon instead.
   *
   * To replace with a real screenshot: overwrite the file at the same
   * path (e.g. `public/project-images/hargeisa-tax-system.webp`) with
   * an actual product screenshot — no code changes needed.
   */
  image?: string;
};

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "full-stack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
  { id: "system", label: "System Development" },
  { id: "wip", label: "Work in Progress" },
];

/**
 * Hand-curated, featured projects. These are shown first and are always
 * merged with (and de-duplicated against) the live GitHub repositories
 * fetched in `useGitHubProjects`. Descriptions, technologies and status
 * below reflect what has actually been confirmed — nothing here is
 * invented.
 */
export const featuredProjects: LocalProject[] = [
  {
    id: "hargeisa-tax-system",
    title: "Hargeisa Municipal Tax & Property Management System",
    repo: "https://github.com/ridwaancabdi888-hub/Hargeisa-Property-Tax-System",
    category: "system",
    description:
      "A full-stack municipal tax and property management platform containing regional dashboards, GIS property mapping, property registration, image uploads, tax management, analytics, role-based access control, activity auditing, data export and database backup and restore.",
    technologies: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Node.js",
      "Express.js",
      "MySQL",
      "MariaDB",
      "JWT authentication",
      "GIS mapping",
    ],
    status: "Major project",
    featured: true,
    image: "/project-images/hargeisa-tax-system.webp",
  },
  {
    id: "hostel-management",
    title: "University Hostel Management System",
    repo: "https://github.com/ridwaancabdi888-hub/university-hostel-management-system",
    category: "system",
    description:
      "A university hostel management system for room inventory, student registration, room allocation, billing, invoices, payments, maintenance requests, visitor management, reports and role-based administration.",
    technologies: [
      "PHP",
      "Laravel 12",
      "Blade",
      "Tailwind CSS",
      "Alpine.js",
      "Vite",
      "MySQL",
      "PHPUnit",
    ],
    status: "Major project",
    featured: true,
    image: "/project-images/hostel-management.webp",
  },
  {
    id: "epharmacy",
    title: "Zaad/e-Dahab E-Pharmacy",
    repo: "https://github.com/ridwaancabdi888-hub/zaad-dahab-epharmacy",
    category: "mobile",
    description:
      "A full-stack e-pharmacy platform for Somalia consisting of a Flutter customer and delivery application, a Node.js and MongoDB backend and a React administrative dashboard. Includes mobile-money payment architecture, medicine management, shopping cart, ordering, delivery tracking, rider workflows, reports and notifications.",
    technologies: [
      "Flutter",
      "Dart",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "React",
      "Vite",
      "JWT",
      "REST APIs",
    ],
    status: "Major project",
    featured: true,
    image: "/project-images/epharmacy.webp",
  },
];

/**
 * Additional repositories to look for on the live GitHub API and surface
 * once fetched. These are intentionally left without invented
 * descriptions — `useGitHubProjects` / `GitHubProjects` decide whether
 * each one has enough real content (a non-empty description, or a size
 * above the "likely just a placeholder" threshold) to be listed as a
 * project, or whether it belongs under "Work in Progress".
 */
export const watchedRepoNames = [
  "full-stack",
  "RAMAD-CONSTRUCTION1",
  "python",
  "dalxiis",
  "Scroll-site",
  "RAMAD-CONSTRUCTION",
  "new",
];

export const githubApiEndpoint =
  "https://api.github.com/users/ridwaancabdi888-hub/repos?sort=updated&per_page=100";
