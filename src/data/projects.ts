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
  repo?: string;
  liveUrl?: string;
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
  { id: "frontend", label: "Websites" },
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
    id: "gym-system",
    title: "Gym SaaS — Multi-Gym Management System",
    repo: "https://github.com/ridwaancabdi888-hub/GYM-System",
    category: "system",
    description:
      "A multi-tenant commercial gym management SaaS with Super Admin, Gym Admin, Staff and Member roles; isolated per-gym data, membership plans and subscriptions, payments, attendance with QR check-in, staff permissions and activity logs, announcements, reports and member self-service. The production deployment uses a React/Vite frontend, Express serverless API and Supabase PostgreSQL database.",
    technologies: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Supabase", "JWT", "bcrypt", "Vercel"],
    status: "Major project",
    featured: true,
    image: "/project-images/gym-system.webp",
  },
  {
    id: "school-management-system",
    title: "School Management System — Multi-Tenant SaaS",
    repo: "https://github.com/ridwaancabdi888-hub/school-management-system",
    category: "system",
    description:
      "A production multi-tenant school management SaaS where a Platform Super Admin manages schools and each School Admin operates an isolated tenant. It covers students, teachers, classes and subjects, attendance, fees and payments, exams and results, announcements, reports and account management, with JWT role-based access and server-side tenant isolation.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express.js", "PostgreSQL", "Supabase", "Supabase Storage", "JWT", "Vercel"],
    status: "Major project",
    featured: true,
    image: "https://image.thum.io/get/width/1600/crop/900/https://school-management-system-lyart-iota.vercel.app/",
  },
  {
    id: "hargaisa-tax-small-1",
    title: "Hargeisa Property Tax Management System — Beginner Edition",
    repo: "https://github.com/ridwaancabdi888-hub/hargaisa-tax-small-1",
    category: "system",
    description:
      "A beginner-friendly property tax management system designed for a university presentation, with administrator login, dashboard statistics, property add/edit/delete/search workflows, tax payment recording, reports and Leaflet GIS mapping. Local mode uses Node.js, Express and MySQL through XAMPP, while the public Vercel deployment uses an isolated browser demo so the showcase works without a hosted database server.",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Node.js", "Express.js", "MySQL", "Leaflet.js", "Vercel"],
    status: "Major project",
    featured: false,
  },
  {
    id: "hostel-management",
    title: "University Hostel Management System",
    repo: "https://github.com/ridwaancabdi888-hub/university-hostel-management-system",
    category: "system",
    description:
      "A university hostel management system for room inventory, student registration, room allocation, billing, invoices, payments, maintenance requests, visitor management, reports and role-based administration.",
    technologies: ["PHP", "Laravel 12", "Blade", "Tailwind CSS", "Alpine.js", "Vite", "PostgreSQL", "Supabase", "Vercel", "PHPUnit"],
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
    image: "/project-images/ai-interview-coach.webp",
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
    image: "/project-images/kireeye.webp",
  },
  {
    id: "ridwaan-mobile-store",
    title: "Ridwaan Mobile Store",
    repo: "https://github.com/ridwaancabdi888-hub/ridwaan-mobile-store",
    category: "mobile",
    description:
      "A polished mobile-first smartphone shopping PWA with customer authentication, product search and filters, cart, wishlist, rewards, checkout, order history, dark mode and an Admin Control Center for inventory, orders, payments and user roles.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PWA", "LocalStorage", "Responsive Design"],
    status: "Major project",
    featured: false,
    image: "/project-images/ridwaan-mobile-store.webp",
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
    id: "amber-oak-restaurant",
    title: "Amber & Oak — Smart Restaurant & Table Ordering System",
    repo: "https://github.com/ridwaancabdi888-hub/amber-oak-restaurant-system",
    category: "full-stack",
    description:
      "A production-ready restaurant management platform with role-based administration, table floor planning, menu and stock management, POS ordering and atomic checkout, a live kitchen display, receipts, sales history, analytics, settings and an installable responsive PWA.",
    technologies: ["Python 3.12", "Flask", "PostgreSQL", "SQLite", "Jinja2", "JavaScript", "Chart.js", "PWA", "Vercel"],
    status: "Major project",
    featured: false,
    image: "/project-images/amber-oak-restaurant.webp",
  },
  {
    id: "saffron-slate-restaurant",
    title: "Saffron & Slate Restaurant OS",
    repo: "https://github.com/ridwaancabdi888-hub/saffron-slate-restaurant-system",
    category: "full-stack",
    description:
      "A production-ready restaurant operations and point-of-sale system for administrators, cashiers and kitchen staff, combining a live dashboard, responsive table floor plan, menu and stock management, secure checkout, kitchen workflow, receipts, order history, settings and a mobile-ready PWA.",
    technologies: ["Python 3.12", "Flask", "PostgreSQL", "SQLite", "Jinja2", "JavaScript", "PWA", "Vercel"],
    status: "Major project",
    featured: false,
    image: "/project-images/saffron-slate-restaurant.webp",
  },
  {
    id: "sandbox-cafeteria",
    title: "SANDBOX Cafeteria Management System",
    repo: "https://github.com/ridwaancabdi888-hub/SANDBOX-SYSTEM",
    category: "system",
    description:
      "A complete cafeteria operations platform with QR-based seat ordering, kitchen display workflows, waiter hand-off, cashier POS, payments, thermal receipt printing, inventory management, administrative controls, Supabase Realtime and role-based access.",
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Supabase", "PostgreSQL", "Realtime", "Vercel"],
    status: "Major project",
    featured: true,
    image: "https://image.thum.io/get/width/1600/crop/900/https://sandbox-cafeteria.vercel.app/",
  },
  {
    id: "maareynta-lacagta",
    title: "Maareynta Lacagta — Deposit Management System",
    repo: "https://github.com/ridwaancabdi888-hub/debosit-mony",
    category: "full-stack",
    description:
      "A bilingual Somali and English deposit-management system for registering customer deposits, calculating gross returns, broker commission and net customer payouts, with secure records, dashboards and an auditable transaction workflow.",
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Supabase", "PostgreSQL", "Vercel"],
    status: "Major project",
    featured: true,
    image: "https://image.thum.io/get/width/1600/crop/900/https://maareynta-lacagta.vercel.app/",
  },
  {
    id: "house-of-beauty-hargeisa",
    title: "House of Beauty Hargeisa",
    liveUrl: "https://houseofbeautyhargeisa.com/",
    category: "frontend",
    description:
      "A polished beauty salon and spa website for House of Beauty Hargeisa, presenting services, contact information and a professional online presence for local and diaspora customers.",
    technologies: ["Responsive Website", "SEO", "Vercel", "Custom Domain"],
    status: "Major project",
    featured: true,
    image: "https://image.thum.io/get/width/1600/crop/900/https://houseofbeautyhargeisa.com/",
  },
  {
    id: "jabane-online-demo",
    title: "Jabane Online Website",
    liveUrl: "https://jabane-online-demo.vercel.app/",
    category: "frontend",
    description:
      "A responsive business website demo designed to give Jabane Online a clear, modern digital presence and make its information easier for customers to discover.",
    technologies: ["Responsive Design", "Business Website", "Vercel"],
    status: "Major project",
    featured: false,
    image: "https://image.thum.io/get/width/1600/crop/900/https://jabane-online-demo.vercel.app/",
  },
  {
    id: "gobanimo-furniture-demo",
    title: "Gobanimo Furniture Website",
    liveUrl: "https://gobanimo-furniture-demo.vercel.app/",
    category: "frontend",
    description:
      "A modern furniture business website demo that showcases products and helps customers explore the brand and contact the business online.",
    technologies: ["Responsive Design", "Product Showcase", "Vercel"],
    status: "Major project",
    featured: false,
    image: "https://image.thum.io/get/width/1600/crop/900/https://gobanimo-furniture-demo.vercel.app/",
  },
  {
    id: "edepsan-hinna-demo",
    title: "Edepsan Hinna Website",
    liveUrl: "https://edepsan-hinna-demo.vercel.app/",
    category: "frontend",
    description:
      "A mobile-friendly henna business website demo focused on services, visual presentation and fast customer contact.",
    technologies: ["Responsive Design", "Beauty Website", "Vercel"],
    status: "Major project",
    featured: false,
    image: "https://image.thum.io/get/width/1600/crop/900/https://edepsan-hinna-demo.vercel.app/",
  },
  {
    id: "muna-hair-design-demo",
    title: "Muna Hair Design Website",
    liveUrl: "https://muna-hair-design-demo.vercel.app/",
    category: "frontend",
    description:
      "A clean salon website demo showcasing hair-design services with a mobile-first layout and clear contact path.",
    technologies: ["Responsive Design", "Salon Website", "Vercel"],
    status: "Major project",
    featured: false,
    image: "https://image.thum.io/get/width/1600/crop/900/https://muna-hair-design-demo.vercel.app/",
  },
  {
    id: "hadiya-hair-design-demo",
    title: "Hadiya Hair Design Website",
    liveUrl: "https://hadiya-hair-design-demo.vercel.app/",
    category: "frontend",
    description:
      "A responsive hair and beauty website demo created to present services professionally and guide customers toward direct contact.",
    technologies: ["Responsive Design", "Salon Website", "Vercel"],
    status: "Major project",
    featured: false,
    image: "https://image.thum.io/get/width/1600/crop/900/https://hadiya-hair-design-demo.vercel.app/",
  },
  {
    id: "hananei04-demo",
    title: "Hananei04 Beauty Website",
    liveUrl: "https://hananei04-demo.vercel.app/",
    category: "frontend",
    description:
      "A contemporary beauty-business website demo with a polished visual identity, service presentation and mobile-friendly customer journey.",
    technologies: ["Responsive Design", "Beauty Website", "Vercel"],
    status: "Major project",
    featured: false,
    image: "https://image.thum.io/get/width/1600/crop/900/https://hananei04-demo.vercel.app/",
  },
  {
    id: "sakiina-wellness-spa-demo",
    title: "Sakiina Wellness Spa Website",
    liveUrl: "https://sakiina-wellness-spa-demo.vercel.app/",
    category: "frontend",
    description:
      "A calm, modern wellness and spa website demo that highlights treatments, brand atmosphere and simple customer contact.",
    technologies: ["Responsive Design", "Wellness Website", "Vercel"],
    status: "Major project",
    featured: false,
    image: "https://image.thum.io/get/width/1600/crop/900/https://sakiina-wellness-spa-demo.vercel.app/",
  },
  {
    id: "ayuush-henna-demo",
    title: "Ayuush Henna Website",
    liveUrl: "https://ayuush-henna-demo.vercel.app/",
    category: "frontend",
    description:
      "A visual henna-services website demo designed for mobile visitors and straightforward booking or inquiry contact.",
    technologies: ["Responsive Design", "Henna Website", "Vercel"],
    status: "Major project",
    featured: false,
    image: "https://image.thum.io/get/width/1600/crop/900/https://ayuush-henna-demo.vercel.app/",
  },
  {
    id: "dear-dumar-boutique-demo",
    title: "Dear Dumar Boutique Website",
    liveUrl: "https://temporary-brisk-thunder-m9jr8p5.vercel.app/",
    category: "frontend",
    description:
      "A boutique website demo with a stylish product-focused presentation, responsive layout and direct path for customer inquiries.",
    technologies: ["Responsive Design", "Boutique Website", "Vercel"],
    status: "Major project",
    featured: false,
    image: "https://image.thum.io/get/width/1600/crop/900/https://temporary-brisk-thunder-m9jr8p5.vercel.app/",
  },
  {
    id: "hafiya-store-demo",
    title: "Hafiya Store Website",
    liveUrl: "https://hafiya-store-demo.vercel.app/",
    category: "frontend",
    description:
      "A responsive retail store website demo that presents products clearly and helps customers reach the business quickly.",
    technologies: ["Responsive Design", "Store Website", "Vercel"],
    status: "Major project",
    featured: false,
    image: "https://image.thum.io/get/width/1600/crop/900/https://hafiya-store-demo.vercel.app/",
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
  "amber-oak-restaurant-system",
  "saffron-slate-restaurant-system",
  "hargaisa-tax-small-1",
  "GYM-System",
  "school-management-system",
  "SANDBOX-SYSTEM",
  "debosit-mony",
];

export const repoImageByName: Record<string, string> = {
  "ridwaan-portfolio": "/project-images/ridwaan-portfolio.webp",
  python: "/project-images/python.webp",
  dalxiis: "/project-images/dalxiis.webp",
  "ridwaan-mobile-store": "/project-images/ridwaan-mobile-store.webp",
  "ramad-construction-real-estate": "https://ridwaan-project-screenshots.vercel.app/ramad-construction.jpg",
  "ai-interview-coach": "/project-images/ai-interview-coach.webp",
  kireeye: "/project-images/kireeye.webp",
  "amber-oak-restaurant-system": "/project-images/amber-oak-restaurant.webp",
  "saffron-slate-restaurant-system": "/project-images/saffron-slate-restaurant.webp",
  "gym-system": "/project-images/gym-system.webp",
  "school-management-system": "https://image.thum.io/get/width/1600/crop/900/https://school-management-system-lyart-iota.vercel.app/",
  "sandbox-system": "https://image.thum.io/get/width/1600/crop/900/https://sandbox-cafeteria.vercel.app/",
  "debosit-mony": "https://image.thum.io/get/width/1600/crop/900/https://maareynta-lacagta.vercel.app/",
};

export const repoLiveUrlByName: Record<string, string> = {
  "ridwaan-portfolio": "https://ridwaan-portfolio.vercel.app/",
  python: "https://learn-python-ridwaan.vercel.app/",
  dalxiis: "https://dalxiis-six.vercel.app/",
  "zaad-dahab-epharmacy": "https://zaad-dahab-epharmacy.vercel.app/",
  "hargeisa-property-tax-system": "https://hargaisa-text-property-system.vercel.app/",
  "hargaisa-tax-small-1": "https://hargaisa-tax-small-1.vercel.app/",
  "ai-interview-coach": "https://ai-interview-coach-sigma-bay.vercel.app/",
  kireeye: "https://kireeye-x2oq-ruddy.vercel.app/",
  "ridwaan-mobile-store": "https://ridwaan-mobile-store.vercel.app/",
  "ramad-construction-real-estate": "https://ramad-construction-real-estate.vercel.app/",
  "amber-oak-restaurant-system": "https://amber-oak-restaurant.vercel.app/",
  "saffron-slate-restaurant-system": "https://saffron-slate-restaurant.vercel.app/",
  "gym-system": "https://gym-system-beta.vercel.app/",
  "school-management-system": "https://school-management-system-lyart-iota.vercel.app/",
  "sandbox-system": "https://sandbox-cafeteria.vercel.app/",
  "debosit-mony": "https://maareynta-lacagta.vercel.app/",
};

export const githubApiEndpoint =
  "https://api.github.com/users/ridwaancabdi888-hub/repos?sort=updated&per_page=100";
