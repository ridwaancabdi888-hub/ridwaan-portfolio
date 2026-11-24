/**
 * Curated project catalogue.
 *
 * Every entry was checked against its source before being listed:
 * - `liveUrl` is only set when the deployment answered with a working page
 *   (HTTP 200, correct app) during the November 2026 audit.
 * - `repoUrl` is only set for PUBLIC GitHub repositories. Private repositories
 *   are listed without a source link so visitors never land on a 404.
 * - `image` is a real screenshot of the live deployment (public/projects/*),
 *   or of the project's own build when it has no public deployment yet.
 */

export type CategoryId =
  | "business-systems"
  | "real-estate"
  | "ecommerce"
  | "ai"
  | "business-websites"
  | "travel"
  | "other";

export type ProjectStatus = "Live" | "In development" | "Completed";

export type ProjectLink = { label: string; url: string };

export type Project = {
  id: string;
  title: string;
  /** One-line positioning shown on cards. */
  summary: string;
  /** Longer professional description shown in the details dialog. */
  description: string;
  /** Who or what the project was built for. */
  builtFor?: string;
  features: string[];
  technologies: string[];
  categories: CategoryId[];
  status: ProjectStatus;
  year: number;
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  /** Extra live links for collection entries (e.g. a set of business sites). */
  links?: ProjectLink[];
  /** Note shown in the dialog, e.g. why a demo opens on a sign-in screen. */
  note?: string;
  image?: string;
};

export const categories: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "business-systems", label: "Business Management Systems" },
  { id: "real-estate", label: "Real Estate & Architecture" },
  { id: "ecommerce", label: "E-commerce & Online Stores" },
  { id: "ai", label: "AI & Intelligent Applications" },
  { id: "business-websites", label: "Business Websites" },
  { id: "travel", label: "Travel & Booking Platforms" },
  { id: "other", label: "Other Software Solutions" },
];

const GH = "https://github.com/ridwaancabdi888-hub";
const SIGN_IN_NOTE =
  "The live demo opens on the system's secure sign-in screen — business data is behind role-based authentication.";

export const projects: Project[] = [
  {
    id: "riyaad-management-system",
    title: "Riyaad Real Estate Management System",
    summary:
      "Internal property, sales, rentals and CRM platform for a Hargeisa real-estate and construction company.",
    description:
      "A Somali-first internal management system (with an English toggle) that runs Riyaad Real Estate's day-to-day operations: properties with owners, photos, documents and 3D assets, construction projects, customer CRM, sales approvals, tenancies, rent payments, receipts and arrears, expenses and financial reports. It supports USD and Somaliland Shilling, dynamic roles with a permission matrix, an audit log and a secure public API that feeds the company's websites.",
    builtFor: "Riyaad Real Estate, Hargeisa",
    features: [
      "Properties, owners, documents, photos and 3D asset publishing",
      "Sales approval workflow, tenancies, rent receipts and arrears tracking",
      "Customer CRM with inquiries, viewings and notes",
      "Dynamic roles with a permission matrix and full audit log",
      "Dual currency (USD + SLSH) and CSV financial reports",
      "Secure public API powering the company website",
    ],
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Supabase", "PostgreSQL", "Zod", "Vitest", "Playwright"],
    categories: ["business-systems", "real-estate"],
    status: "Live",
    year: 2026,
    featured: true,
    liveUrl: "https://riyaad-real-estate-system.vercel.app/",
    note: SIGN_IN_NOTE,
    image: "/projects/riyaad-system.webp",
  },
  {
    id: "riyaad-3d-website",
    title: "Riyaad Real Estate 3D Website",
    summary:
      "Bilingual company website with an interactive 3D showroom of house designs, plans and rooms.",
    description:
      "The public website for Riyaad Real Estate — construction, land sales, home sales and rental management — featuring an interactive Three.js showroom where visitors can orbit 3D models of the company's design previews, view floor plans and rooms, and contact the office. Content is edited in a custom WordPress theme and plugin, exported to static JSON and built into a fast static site on Vercel, so the public site never depends on the office server.",
    builtFor: "Riyaad Real Estate, Hargeisa",
    features: [
      "Interactive 3D model viewer with optimized GLB models",
      "Somali and English content with a language switch",
      "Custom WordPress theme + projects plugin as the editing back office",
      "Static export pipeline for fast, secure hosting",
      "Office map, directions and schema.org structured data",
    ],
    technologies: ["Three.js", "JavaScript", "WordPress", "PHP", "Node.js build pipeline", "Vercel"],
    categories: ["real-estate", "business-websites"],
    status: "Live",
    year: 2026,
    featured: true,
    liveUrl: "https://riyaad-real-estate-3d.vercel.app/",
    image: "/projects/riyaad-3d.webp",
  },
  {
    id: "sandbox-cafeteria",
    title: "SANDBOX Cafeteria Management System",
    summary:
      "QR seat ordering, kitchen display, waiter hand-off and cashier POS wired together in real time.",
    description:
      "A production-oriented cafeteria operations platform. Customers scan a QR code at their seat to order; orders flow live to a kitchen display, then to waiters for hand-off, while the cashier POS handles payment and prints thermal receipts. An admin back office manages the menu, ingredient-level inventory and staff, with role-based access across every screen and Supabase Realtime keeping all stations in sync.",
    builtFor: "SANDBOX Cafeteria",
    features: [
      "QR seat ordering with live order tracking",
      "Kitchen display and waiter hand-off workflow",
      "Cashier POS with thermal receipt printing",
      "Ingredient-level inventory and admin back office",
      "Realtime sync across all stations, role-based access",
    ],
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Supabase", "PostgreSQL", "Realtime", "Zustand", "Zod"],
    categories: ["business-systems"],
    status: "Live",
    year: 2026,
    featured: true,
    liveUrl: "https://sandbox-cafeteria.vercel.app/",
    repoUrl: `${GH}/SANDBOX-SYSTEM`,
    note: SIGN_IN_NOTE,
    image: "/projects/sandbox.webp",
  },
  {
    id: "ai-interview-coach",
    title: "AI Interview Coach",
    summary:
      "AI mock-interview platform with written and voice practice, per-answer coaching and progress reports.",
    description:
      "An interview-practice platform for students and job seekers. Candidates choose a role, experience level and difficulty, then answer AI-generated, role-specific questions in writing or by voice. Each answer receives coaching feedback from a server-side OpenAI integration, and a final report and analytics dashboard track progress over time. Includes authentication, user profiles and administration foundations.",
    features: [
      "Role-specific AI question generation (OpenAI, server-side)",
      "Voice mode with microphone recording and speech recognition",
      "Per-answer coaching and final performance reports",
      "Progress analytics, profiles and Supabase authentication",
    ],
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "OpenAI API", "Supabase", "PostgreSQL"],
    categories: ["ai"],
    status: "Live",
    year: 2026,
    featured: true,
    liveUrl: "https://ai-interview-coach-sigma-bay.vercel.app/",
    repoUrl: `${GH}/AI-Interview-Coach`,
    image: "/projects/ai-coach.webp",
  },
  {
    id: "hargeisa-tax-system",
    title: "Hargeisa Municipal Tax & Property System",
    summary:
      "Municipal tax and property platform with GIS mapping, analytics, RBAC and audit logging.",
    description:
      "A full-stack municipal tax and property management platform with regional overview dashboards, GIS property mapping, property registration with image uploads, tax assessment and payment management, analytics, role-based access control, activity auditing, data export and database backup and restore. The API is hardened with rate limiting, validation and secure cookie-based JWT authentication.",
    features: [
      "GIS property map with Leaflet",
      "Property registry with image uploads and tax management",
      "Analytics dashboards with Recharts",
      "RBAC, activity audit log, Excel/PDF export, backup & restore",
      "Swagger-documented REST API with rate limiting",
    ],
    technologies: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "Express.js", "MySQL / MariaDB", "JWT", "Leaflet"],
    categories: ["business-systems"],
    status: "Live",
    year: 2026,
    featured: true,
    liveUrl: "https://hargaisa-text-property-system.vercel.app/",
    repoUrl: `${GH}/Hargeisa-Property-Tax-System`,
    note: SIGN_IN_NOTE,
    image: "/projects/hargeisa-tax.webp",
  },
  {
    id: "kaafi-travel",
    title: "Kaafi Travel Agency Website",
    summary:
      "Bilingual travel agency site with flights, visas, Hajj & Umrah packages, inquiries and an agency workspace.",
    description:
      "A premium Somali/English website for a Hargeisa travel agency, covering flights, visa services, hotels, Hajj & Umrah and holiday packages. Visitors submit durable inquiries and can track them privately, while a protected agency workspace manages inquiries and published content. All catalogue offers are clearly marked as examples — no fake fares or bookings are claimed.",
    builtFor: "Kaafi Travel Agency, Hargeisa",
    features: [
      "Somali and English interface sharing one component set",
      "Durable inquiry capture with private tracking",
      "Protected admin workspace for inquiries and content",
      "Rate-limited, validated Express API",
      "WhatsApp-first contact flow",
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Express.js", "Supabase", "Zod"],
    categories: ["travel", "business-websites"],
    status: "Live",
    year: 2026,
    featured: true,
    liveUrl: "https://kaafi-travel-agency.vercel.app/",
    image: "/projects/kaafi-travel.webp",
  },
  {
    id: "kaafiye-spare-parts",
    title: "Kaafiye Spare Parts Management System",
    summary:
      "Multi-business inventory, POS and tyre-repair records for a Somaliland spare-parts shop.",
    description:
      "An installable PWA that runs a small Somaliland spare-parts shop: multi-business inventory, a simple point of sale and Banjarka (tyre-repair) service records. Somali by default with an English toggle. Public sign-up is disabled, every table is protected by Supabase Row Level Security, and the app auto-deploys from GitHub to Vercel.",
    builtFor: "Kaafiye spare-parts shop",
    features: [
      "Multi-business inventory and stock control",
      "Simple POS for daily sales",
      "Tyre-repair (Banjarka) service records",
      "Row Level Security on every table; invite-only accounts",
      "Installable PWA, Somali/English",
    ],
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS 4", "Supabase", "PostgreSQL", "PWA"],
    categories: ["business-systems"],
    status: "Live",
    year: 2026,
    liveUrl: "https://kaafiye-spare-parts.vercel.app/",
    repoUrl: `${GH}/kaafiye-spare-parts`,
    note: SIGN_IN_NOTE,
    image: "/projects/kaafiye.webp",
  },
  {
    id: "gym-saas",
    title: "GYM Management System (Multi-Gym SaaS)",
    summary:
      "Multi-tenant gym SaaS with memberships, payments, QR check-in and four access levels.",
    description:
      "A commercial SaaS for managing multiple gyms from one platform. Super Admin, Gym Admin, Staff and Member roles each see only what they should, and every gym's data is isolated by tenant. Covers membership plans and subscriptions, payments, QR-code attendance, staff permissions and activity logs, announcements, reports and member self-service.",
    features: [
      "Multi-tenant data isolation per gym",
      "Membership plans, subscriptions and payments",
      "QR-code check-in and attendance",
      "Staff permissions, activity logs and reports",
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Supabase", "PostgreSQL", "JWT", "bcrypt"],
    categories: ["business-systems"],
    status: "Live",
    year: 2026,
    liveUrl: "https://gym-system-beta.vercel.app/",
    repoUrl: `${GH}/GYM-System`,
    note: SIGN_IN_NOTE,
    image: "/projects/gym.webp",
  },
  {
    id: "school-management-system",
    title: "School Management System (Multi-Tenant SaaS)",
    summary:
      "One platform, many schools — students, attendance, fees, exams and reports with tenant isolation.",
    description:
      "A focused multi-tenant school management SaaS. A Platform Super Admin creates schools, and each School Admin manages only their own school: students, teachers, classes and subjects, attendance, fees and payments, exams and results, announcements and reports. Tenant isolation is enforced server-side on every request.",
    features: [
      "Server-side tenant isolation",
      "Students, teachers, classes and attendance",
      "Fees, payments, exams and results",
      "PDF and Excel reports",
    ],
    technologies: ["JavaScript", "Node.js", "Express.js", "PostgreSQL", "Supabase Storage", "JWT", "PDFKit"],
    categories: ["business-systems"],
    status: "Live",
    year: 2026,
    liveUrl: "https://school-management-system-lyart-iota.vercel.app/",
    repoUrl: `${GH}/school-management-system`,
    note: SIGN_IN_NOTE,
    image: "/projects/school.webp",
  },
  {
    id: "amber-oak",
    title: "Amber & Oak Restaurant System",
    summary:
      "Table ordering, POS, kitchen display, receipts and analytics for a full-service restaurant.",
    description:
      "A restaurant management platform with a table floor plan, menu and stock management, a fast POS ordering flow with atomic checkout, a live kitchen display, receipts, sales history, an analytics dashboard and configurable settings — with role-based access for administrators, cashiers and kitchen staff. Installable as a PWA.",
    features: [
      "Table floor plan and POS ordering",
      "Live kitchen display system",
      "Atomic checkout, receipts and sales history",
      "Analytics dashboard (Chart.js) and role-based access",
    ],
    technologies: ["Python", "Flask", "PostgreSQL", "SQLite", "Jinja2", "JavaScript", "Chart.js", "PWA"],
    categories: ["business-systems"],
    status: "Live",
    year: 2026,
    liveUrl: "https://amber-oak-restaurant.vercel.app/",
    note: SIGN_IN_NOTE,
    image: "/projects/amber-oak.webp",
  },
  {
    id: "saffron-slate",
    title: "Saffron & Slate Restaurant OS",
    summary:
      "Restaurant operations and POS with decimal-safe checkout, stock locking and kitchen workflow.",
    description:
      "A restaurant operations and point-of-sale system for administrators, cashiers and kitchen staff: a live operations dashboard, responsive table floor plan, menu and stock management, decimal-safe checkout with discounts, tax, change and stock locking, kitchen workflow, receipts, order history and an installable mobile PWA.",
    features: [
      "Decimal-safe checkout with discounts and configurable tax",
      "Stock locking to prevent overselling",
      "Kitchen workflow and receipts",
      "Role-protected admin, cashier and kitchen workspaces",
    ],
    technologies: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "SQLite", "Jinja2", "PWA"],
    categories: ["business-systems"],
    status: "Live",
    year: 2026,
    liveUrl: "https://saffron-slate-restaurant.vercel.app/",
    note: SIGN_IN_NOTE,
    image: "/projects/saffron.webp",
  },
  {
    id: "maareynta-lacagta",
    title: "Maareynta Lacagta — Deposit Management",
    summary:
      "Bilingual deposit manager that calculates returns, broker commission and customer payouts.",
    description:
      "A Somali/English system for managing fixed-term customer deposits. It records each deposit and calculates the gross return, broker commission (always on the principal), net customer payout, profit and due date, with secure records and dashboards for an auditable transaction workflow.",
    features: [
      "Deposit registration with automatic return calculations",
      "Broker commission and net payout tracking",
      "Due-date tracking and dashboards",
      "Bilingual Somali / English interface",
    ],
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Supabase", "PostgreSQL"],
    categories: ["business-systems"],
    status: "Live",
    year: 2026,
    liveUrl: "https://maareynta-lacagta.vercel.app/",
    repoUrl: `${GH}/debosit-mony`,
    note: SIGN_IN_NOTE,
    image: "/projects/maareynta.webp",
  },
  {
    id: "university-hostel",
    title: "University Hostel Management System",
    summary:
      "Laravel system for rooms, allocations, billing, maintenance, visitors and reports.",
    description:
      "A Laravel 12 application that runs university hostel operations end to end: room inventory, student registration, room allocation, billing, invoices and payments, maintenance requests, visitor management and a role-based reporting centre — with authorization policies, security headers, rate limiting, activity logging and automated backups built in.",
    features: [
      "Room inventory and allocation",
      "Billing, invoices and payments",
      "Maintenance and visitor management",
      "Authorization policies, activity log and automated backups",
    ],
    technologies: ["PHP", "Laravel 12", "Blade", "Tailwind CSS", "Alpine.js", "PostgreSQL", "PHPUnit"],
    categories: ["business-systems"],
    status: "Completed",
    year: 2026,
    repoUrl: `${GH}/university-hostel-management-system`,
  },
  {
    id: "ramad-construction",
    title: "Ramad Construction & Real Estate",
    summary:
      "Cinematic construction and real-estate website with GSAP storytelling and property listings.",
    description:
      "A premium single-page website for a Somaliland construction and real-estate company covering construction, property sales, rentals, architectural services and property management. It features a full-screen cinematic hero, a four-scene architectural story, a lightweight Three.js depth effect with desktop-only performance safeguards, GSAP ScrollTrigger reveals and consultation forms.",
    features: [
      "Cinematic hero and scroll-driven architectural story",
      "Property listings with filters",
      "Before/after comparison and project showcase",
      "Performance safeguards for mobile devices",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "ScrollTrigger", "Three.js"],
    categories: ["real-estate", "business-websites"],
    status: "Live",
    year: 2026,
    liveUrl: "https://ramad-construction-real-estate.vercel.app/",
    repoUrl: `${GH}/ramad-construction-real-estate`,
    image: "/projects/ramad.webp",
  },
  {
    id: "house-of-beauty",
    title: "House of Beauty & Spa Website",
    summary:
      "Live business website on a custom domain for a Hargeisa beauty salon and spa.",
    description:
      "The official website of House of Beauty Hargeisa, presenting salon and spa services, the brand atmosphere and direct contact options for local and diaspora customers. Deployed on a custom domain with SEO metadata, a sitemap and optimized WebP imagery.",
    builtFor: "House of Beauty, Hargeisa",
    features: [
      "Custom domain with SEO and sitemap",
      "Service presentation and booking contact paths",
      "Optimized WebP imagery, mobile-first layout",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "SEO", "Vercel", "Custom domain"],
    categories: ["business-websites"],
    status: "Live",
    year: 2026,
    liveUrl: "https://house-ofbeauty.com/",
    image: "/projects/house-of-beauty.webp",
  },
  {
    id: "beersan-store",
    title: "Beersan Online Store",
    summary:
      "Agricultural-inputs e-commerce store with search, collections, smart cart and Somali/English UI.",
    description:
      "An online store for Beersan, a supplier of fertilizers and agricultural inputs for growers in Somalia and Ethiopia. It includes category navigation, search, product collections, responsive product cards, a smart cart and a WhatsApp ordering path, in Somali and English. Mobile-money checkout (WAAFI / eDahab) has been designed and implemented in code but is not yet enabled, because no merchant sandbox transaction has been verified.",
    builtFor: "Beersan agricultural inputs",
    features: [
      "Category navigation, search and product collections",
      "Smart cart with persistence",
      "Somali / English interface",
      "Accessibility-tested (axe) and covered by Playwright tests",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Zod", "Playwright"],
    categories: ["ecommerce"],
    status: "In development",
    year: 2026,
    note: "Not publicly deployed yet — the screenshot is from the project's own review build.",
    image: "/projects/beersan.webp",
  },
  {
    id: "zaad-epharmacy",
    title: "Zaad/e-Dahab E-Pharmacy",
    summary:
      "Flutter customer and rider apps, Node.js API and React admin for medicine ordering and delivery.",
    description:
      "A full-stack e-pharmacy platform for Somalia made of a Flutter mobile app for customers and delivery riders, a Node.js/Express/MongoDB backend and a React administration dashboard. It covers medicine management, cart and ordering, delivery tracking, rider workflows, reports and notifications, with a production-shaped mobile-money (Zaad / e-Dahab) payment interface. The live link opens the admin dashboard sign-in.",
    features: [
      "Flutter app for customers and delivery riders",
      "React admin dashboard with reports and exports",
      "Mobile-money payment architecture",
      "Hardened Express API with Swagger docs",
    ],
    technologies: ["Flutter", "Dart", "Node.js", "Express.js", "MongoDB", "Mongoose", "React", "Vite", "JWT"],
    categories: ["ecommerce", "other"],
    status: "Live",
    year: 2026,
    liveUrl: "https://zaad-dahab-epharmacy.vercel.app/",
    repoUrl: `${GH}/zaad-dahab-epharmacy`,
    image: "/projects/epharmacy.webp",
  },
  {
    id: "ridwaan-mobile-store",
    title: "Ridwaan Mobile Store",
    summary:
      "Mobile-first smartphone shop PWA with cart, wishlist, rewards and an admin control centre.",
    description:
      "A polished mobile-first smartphone shopping app built with vanilla HTML, CSS and JavaScript: sign-up and sign-in, product search and filters, cart, wishlist, rewards, checkout, order history, dark mode and a role-aware Admin Control Center for inventory, orders, payments and users. Installable as a PWA with an offline app shell.",
    features: [
      "Customer accounts, cart, wishlist and rewards",
      "Admin control centre for products, orders and users",
      "Installable PWA with offline shell",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "PWA", "LocalStorage"],
    categories: ["ecommerce"],
    status: "Live",
    year: 2026,
    liveUrl: "https://ridwaan-mobile-store.vercel.app/",
    repoUrl: `${GH}/ridwaan-mobile-store`,
    image: "/projects/mobile-store.webp",
  },
  {
    id: "retail-catalogues",
    title: "Retail Catalogue Websites",
    summary:
      "Four demo catalogue sites designed for Hargeisa shops, with WhatsApp ordering — electronics, furniture, cosmetics and fashion.",
    description:
      "A set of mobile-first product-catalogue demo websites designed for local retailers (each is labelled as a demo on the site). Each presents products by category and sends customers straight into a pre-filled WhatsApp order — the way most Hargeisa shoppers prefer to buy. Built as fast static sites with Somali-language content.",
    features: [
      "Product catalogues by category",
      "Pre-filled WhatsApp ordering",
      "Somali-language, mobile-first design",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    categories: ["ecommerce", "business-websites"],
    status: "Live",
    year: 2026,
    links: [
      { label: "Jabane Online", url: "https://jabane-online-demo.vercel.app/" },
      { label: "Gobanimo Furniture", url: "https://gobanimo-furniture-demo.vercel.app/" },
      { label: "Hafiya Store", url: "https://hafiya-store-demo.vercel.app/" },
      { label: "Dear Dumar Boutique", url: "https://temporary-brisk-thunder-m9jr8p5.vercel.app/" },
    ],
    image: "/projects/hafiya.webp",
  },
  {
    id: "beauty-websites",
    title: "Beauty & Wellness Website Collection",
    summary:
      "Six demo websites for salon, henna and spa businesses, with editorial design and WhatsApp booking.",
    description:
      "A collection of demo websites designed for beauty, henna, hair-design and wellness businesses in Hargeisa (each is labelled as a demo on the site). Each one uses an editorial, photography-led layout, Somali-first copy and a direct WhatsApp booking path designed for mobile visitors.",
    features: [
      "Editorial, photography-led layouts",
      "Somali-first content",
      "WhatsApp booking and inquiry flow",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    categories: ["business-websites"],
    status: "Live",
    year: 2026,
    links: [
      { label: "Edepsan Hinna & Beauty", url: "https://edepsan-hinna-demo.vercel.app/" },
      { label: "Ayuush Henna", url: "https://ayuush-henna-demo.vercel.app/" },
      { label: "Muna Hair Design", url: "https://muna-hair-design-demo.vercel.app/" },
      { label: "Hadiya Hair Design", url: "https://hadiya-hair-design-demo.vercel.app/" },
      { label: "Hananei04 Beauty", url: "https://hananei04-demo.vercel.app/" },
      { label: "Sakiina Wellness Spa", url: "https://sakiina-wellness-spa-demo.vercel.app/" },
    ],
    image: "/projects/edepsan.webp",
  },
  {
    id: "kireeye",
    title: "Kireeye Vehicle Rental Marketplace",
    summary:
      "Multilingual car-rental marketplace for Somaliland and Somalia with owner and company dashboards.",
    description:
      "A vehicle-rental marketplace designed for Somaliland and Somalia, supporting customers, individual car owners, rental companies, company employees and administrators. The current release includes the responsive marketplace homepage, vehicle listings, customer, company and super-admin dashboard prototypes, local city and airport support and a Supabase schema foundation.",
    features: [
      "Vehicle discovery with city and airport search",
      "Customer, company and super-admin dashboards (prototype)",
      "Somali, English and Arabic interface",
      "PWA-ready responsive design",
    ],
    technologies: ["Next.js 15", "TypeScript", "Supabase", "PostgreSQL", "PWA"],
    categories: ["travel"],
    status: "In development",
    year: 2026,
    liveUrl: "https://kireeye-x2oq-ruddy.vercel.app/",
    repoUrl: `${GH}/kireeye`,
    image: "/projects/kireeye.webp",
  },
  {
    id: "dalxiis",
    title: "DALXIIS Somaliland Travel Guide",
    summary:
      "Responsive landing page introducing travel destinations across Somaliland.",
    description:
      "A responsive single-page travel guide that introduces destinations across Somaliland with destination cards, smooth animations and full SEO metadata (Open Graph, Twitter and structured data). It is a guide concept — it does not offer live booking or payments.",
    features: [
      "Destination cards and mobile navigation",
      "Open Graph, Twitter and structured-data metadata",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    categories: ["travel"],
    status: "Live",
    year: 2026,
    liveUrl: "https://dalxiis-six.vercel.app/",
    repoUrl: `${GH}/dalxiis`,
    image: "/projects/dalxiis.webp",
  },
  {
    id: "learn-python",
    title: "Learn Python Learning Platform",
    summary:
      "20-lesson Python course with an in-browser code runner, quizzes, progress tracking and projects.",
    description:
      "A responsive learning platform that teaches Python from beginner to intermediate level: 20 structured lessons, Python running directly in the browser, exercises, an instant-feedback quiz, progress tracking and six practical projects.",
    features: [
      "20 structured lessons",
      "Run Python in the browser",
      "Quiz with instant feedback and progress tracking",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Pyodide (in-browser Python)"],
    categories: ["other"],
    status: "Live",
    year: 2026,
    liveUrl: "https://learn-python-ridwaan.vercel.app/",
    repoUrl: `${GH}/python`,
    image: "/projects/learn-python.webp",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/** Counts derived from the catalogue — never hand-typed. */
export const projectStats = {
  total: projects.length,
  live: projects.filter((p) => p.status === "Live").length,
  liveDeployments: projects.reduce(
    (n, p) => n + (p.liveUrl ? 1 : 0) + (p.links?.length ?? 0),
    0,
  ),
  businessSystems: projects.filter((p) => p.categories.includes("business-systems")).length,
  technologies: new Set(projects.flatMap((p) => p.technologies)).size,
};
