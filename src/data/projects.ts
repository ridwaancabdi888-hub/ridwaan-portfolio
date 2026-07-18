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
   * The three major systems currently use generated concept covers. Real
   * website projects use current screenshots captured from their live demos.
   * ProjectCard falls back to an inline icon when an image is unavailable.
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
 * merged with (and de-duplicated against) the live GitHub repositories.
 */
export const featuredProjects: LocalProject[] = [
  {
    id: "hargeisa-tax-system",
    title: "Hargeisa Municipal Tax & Property Management System",
    repo: "https://github.com/ridwaancabdi888-hub/Hargeisa-Property-Tax-System",
    category: "system",
    description:
      "A full-stack municipal tax and property management platform containing regional dashboards, GIS property mapping, property registration, image uploads, tax management, analytics, role-based access control, activity auditing, data export and database backup and restore. The live portfolio link opens a safe interactive demo with sample data.",
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
      "A university hostel management system for room inventory, student registration, room allocation, billing, invoices, payments, maintenance requests, visitor management, reports and role-based administration. The live portfolio link opens a safe interactive demo with sample data.",
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

/** Repositories shown from the live GitHub API in addition to featured work. */
export const watchedRepoNames = [
  "ridwaan-portfolio",
  "full-stack",
  "RAMAD-CONSTRUCTION1",
  "python",
  "dalxiis",
  "Scroll-site",
  "RAMAD-CONSTRUCTION",
  "new",
];

/** Current live-site screenshots used by non-featured website cards. */
export const repoImageByName: Record<string, string> = {
  "ridwaan-portfolio": "/project-images/ridwaan-portfolio.png",
  python: "/project-images/python.png",
  dalxiis: "/project-images/dalxiis.png",
};

/** Verified live demos. These take priority over GitHub's optional homepage field. */
export const repoLiveUrlByName: Record<string, string> = {
  "ridwaan-portfolio": "https://ridwaan-portfolio.vercel.app/",
  python: "https://learn-python-ridwaan.vercel.app/",
  dalxiis: "https://dalxiis-six.vercel.app/",
  "zaad-dahab-epharmacy": "https://zaad-dahab-epharmacy.vercel.app/",
  "university-hostel-management-system":
    "https://university-hostel-management-demo.vercel.app/",
  "hargeisa-property-tax-system":
    "https://hargeisa-property-tax-demo.vercel.app/",
};

export const githubApiEndpoint =
  "https://api.github.com/users/ridwaancabdi888-hub/repos?sort=updated&per_page=100";
