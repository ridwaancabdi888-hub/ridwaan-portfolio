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

export const featuredProjects: LocalProject[] = [
  {
    id: "hargeisa-tax-system",
    title: "Hargeisa Municipal Tax & Property Management System",
    repo: "https://github.com/ridwaancabdi888-hub/Hargeisa-Property-Tax-System",
    category: "system",
    description:
      "A full-stack municipal tax and property management platform containing regional dashboards, GIS property mapping, property registration, image uploads, tax management, analytics, role-based access control, activity auditing, data export and database backup and restore. The live portfolio link opens the secure sign-in screen first.",
    technologies: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "Express.js", "MySQL", "MariaDB", "JWT authentication", "GIS mapping"],
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
      "A university hostel management system for room inventory, student registration, room allocation, billing, invoices, payments, maintenance requests, visitor management, reports and role-based administration. The live portfolio link opens a dedicated login-only preview.",
    technologies: ["PHP", "Laravel 12", "Blade", "Tailwind CSS", "Alpine.js", "Vite", "MySQL", "PHPUnit"],
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
    technologies: ["Flutter", "Dart", "Node.js", "Express.js", "MongoDB", "Mongoose", "React", "Vite", "JWT", "REST APIs"],
    status: "Major project",
    featured: true,
    image: "/project-images/epharmacy.webp",
  },
  {
    id: "ai-interview-coach",
    title: "AI Interview Coach",
    repo: "https://github.com/ridwaancabdi888-hub/AI-Interview-Coach",
    category: "full-stack",
    description:
      "A production-oriented interview practice platform for students and job seekers with written and voice mock interviews, role-specific AI questions, per-answer coaching, final performance reports, progress analytics, authentication, user profiles and administration foundations.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Supabase", "PostgreSQL", "OpenAI API", "Vercel"],
    status: "Major project",
    featured: true,
    image: "/project-images/ai-interview-coach.png",
  },
  {
    id: "kireeye",
    title: "Kireeye Vehicle Rental Marketplace",
    repo: "https://github.com/ridwaancabdi888-hub/kireeye",
    category: "full-stack",
    description:
      "A multilingual vehicle-rental marketplace for Somaliland and Somalia with vehicle discovery, customer and company dashboards, super-admin controls, local city and airport support, owner and rental-company workflows, Supabase foundations and a PWA-ready responsive experience.",
    technologies: ["Next.js 15", "TypeScript", "Responsive UI", "Supabase", "PostgreSQL", "PWA", "Vercel"],
    status: "Major project",
    featured: true,
    image: "/project-images/kireeye.png",
  },
  {
    id: "ridwaan-mobile-store",
    title: "Ridwaan Mobile Store",
    repo: "https://github.com/ridwaancabdi888-hub/ridwaan-mobile-store",
    category: "mobile",
    description:
      "A responsive smartphone shopping web app with a mobile-app interface, live search and filters, product variants, wishlist, persistent cart, promo codes, rewards levels, multilingual support, dark mode, checkout simulation and local payment-method options.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PWA", "LocalStorage", "Responsive Design"],
    status: "Major project",
    featured: false,
    image: "/project-images/ridwaan-mobile-store.png",
  },
  {
    id: "ramad-construction-real-estate",
    title: "Ramad Construction & Real Estate",
    repo: "https://github.com/ridwaancabdi888-hub/ramad-construction-real-estate",
    category: "frontend",
    description:
      "A premium construction and real-estate website for Somaliland with property listings and filters, project showcases, before-and-after comparison, architectural and property services, consultation forms and responsive animated interactions.",
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "ScrollTrigger", "Responsive Design"],
    status: "Major project",
    featured: false,
    image: "https://ridwaan-project-screenshots.vercel.app/ramad-construction.jpg",
  },
  {
    id: "muuqal-construction-real-estate",
    title: "Muuqal Construction & Real Estate",
    repo: "https://github.com/ridwaancabdi888-hub/muuqal-construction-real-estateqmuuqal-construction-real-estateqq",
    category: "frontend",
    description:
      "A cinematic, single-page construction and real-estate experience with scroll-driven visual storytelling, property and service sections, premium transitions and a responsive presentation designed for mobile and desktop visitors.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Scroll Animations", "3D Visual Experience", "Responsive Design"],
    status: "Major project",
    featured: false,
    image: "/project-images/muuqal-construction-real-estate.png",
  },
];

export const watchedRepoNames = [
  "ridwaan-portfolio",
  "python",
  "dalxiis",
  "ridwaan-mobile-store",
  "ramad-construction-real-estate",
  "AI-Interview-Coach",
  "kireeye",
  "muuqal-construction-real-estateqmuuqal-construction-real-estateqq",
];

export const repoImageByName: Record<string, string> = {
  "ridwaan-portfolio": "/project-images/ridwaan-portfolio.png",
  python: "/project-images/python.png",
  dalxiis: "/project-images/dalxiis.png",
  "ridwaan-mobile-store": "/project-images/ridwaan-mobile-store.png",
  "ramad-construction-real-estate": "https://ridwaan-project-screenshots.vercel.app/ramad-construction.jpg",
  "ai-interview-coach": "/project-images/ai-interview-coach.png",
  kireeye: "/project-images/kireeye.png",
  "muuqal-construction-real-estateqmuuqal-construction-real-estateqq": "/project-images/muuqal-construction-real-estate.png",
};

export const repoLiveUrlByName: Record<string, string> = {
  "ridwaan-portfolio": "https://ridwaan-portfolio.vercel.app/",
  python: "https://learn-python-ridwaan.vercel.app/",
  dalxiis: "https://dalxiis-six.vercel.app/",
  "zaad-dahab-epharmacy": "https://zaad-dahab-epharmacy.vercel.app/",
  "university-hostel-management-system": "https://ridwaan-portfolio.vercel.app/demos/university-hostel-login.html",
  "hargeisa-property-tax-system": "https://softwere-mangement-system.vercel.app/",
  "ai-interview-coach": "https://ai-interview-coach-sigma-bay.vercel.app/",
  kireeye: "https://kireeye-x2oq-ruddy.vercel.app/",
  "ridwaan-mobile-store": "https://ridwaan-mobile-store.vercel.app/",
  "ramad-construction-real-estate": "https://ramad-construction-real-estate.vercel.app/",
  "muuqal-construction-real-estateqmuuqal-construction-real-estateqq": "https://muuqal-construction-real-estate.vercel.app/",
};

export const githubApiEndpoint =
  "https://api.github.com/users/ridwaancabdi888-hub/repos?sort=updated&per_page=100";
