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
 * Hand-curated projects. Featured systems are shown first; selected website
 * projects use the same data model so their titles, descriptions, screenshots
 * and verified live links remain accurate even when GitHub metadata is sparse.
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
  {
    id: "ridwaan-mobile-store",
    title: "Ridwaan Mobile Store",
    repo: "https://github.com/ridwaancabdi888-hub/Mobile-Store",
    category: "mobile",
    description:
      "A polished mobile-first smartphone shopping PWA with customer authentication, product search and filters, cart, wishlist, rewards, checkout, order history, dark mode and an admin control center for inventory, orders, payments and user roles.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PWA",
      "LocalStorage",
      "Responsive Design",
    ],
    status: "Major project",
    featured: false,
    image: "/project-images/mobile-store.png",
  },
  {
    id: "ramad-construction-real-estate",
    title: "Ramad Construction & Real Estate",
    repo: "https://github.com/ridwaancabdi888-hub/ramad-construction-real-estate",
    category: "frontend",
    description:
      "A premium construction and real-estate website for Somaliland with property listings and filters, project showcases, before-and-after comparison, architectural and property services, consultation forms and responsive animated interactions.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "GSAP",
      "ScrollTrigger",
      "Responsive Design",
    ],
    status: "Major project",
    featured: false,
    image: "/project-images/ramad-construction-real-estate.png",
  },
];

/** Repositories shown from the live GitHub API in addition to curated work. */
export const watchedRepoNames = [
  "ridwaan-portfolio",
  "full-stack",
  "RAMAD-CONSTRUCTION1",
  "python",
  "dalxiis",
  "Scroll-site",
  "RAMAD-CONSTRUCTION",
  "Mobile-Store",
  "ramad-construction-real-estate",
  "new",
];

/** Current screenshots used by website project cards. */
export const repoImageByName: Record<string, string> = {
  "ridwaan-portfolio": "/project-images/ridwaan-portfolio.png",
  python: "/project-images/python.png",
  dalxiis: "/project-images/dalxiis.png",
  "mobile-store": "/project-images/mobile-store.png",
  "ramad-construction-real-estate":
    "/project-images/ramad-construction-real-estate.png",
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
  "mobile-store": "https://ridwaan-mobile-store.vercel.app/",
  "ramad-construction-real-estate":
    "https://ramad-construction-real-estate.vercel.app/",
};

export const githubApiEndpoint =
  "https://api.github.com/users/ridwaancabdi888-hub/repos?sort=updated&per_page=100";
