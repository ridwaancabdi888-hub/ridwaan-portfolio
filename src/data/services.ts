import { Bot, Building2, Database, Globe, LayoutDashboard, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  examples: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "business-systems",
    title: "Business management systems",
    description:
      "Inventory, POS, CRM, rentals, memberships and finance — with roles, audit logs and reports built in.",
    examples: "Riyaad Real Estate · SANDBOX · Kaafiye",
    icon: LayoutDashboard,
  },
  {
    id: "web-apps",
    title: "Full-stack web applications",
    description:
      "Multi-tenant SaaS and custom web apps, from database schema to API to a polished, responsive UI.",
    examples: "GYM SaaS · School SaaS · Hargeisa Tax",
    icon: Globe,
  },
  {
    id: "ai",
    title: "AI integration",
    description:
      "AI features inside real products — question generation, feedback and analysis via LLM APIs, kept server-side and secure.",
    examples: "AI Interview Coach",
    icon: Bot,
  },
  {
    id: "databases",
    title: "Database design & development",
    description:
      "Relational models, migrations, row-level security, backups and reporting on PostgreSQL, MySQL and MongoDB.",
    examples: "Supabase · PostgreSQL · MySQL",
    icon: Database,
  },
  {
    id: "commerce",
    title: "E-commerce & online stores",
    description:
      "Catalogues, carts and WhatsApp or mobile-money ordering flows designed for Somali-speaking customers.",
    examples: "Beersan · Ridwaan Mobile Store",
    icon: ShoppingBag,
  },
  {
    id: "websites",
    title: "Business & real-estate websites",
    description:
      "Fast, bilingual, SEO-ready company websites — including interactive 3D property showrooms.",
    examples: "Riyaad 3D · House of Beauty · Kaafi Travel",
    icon: Building2,
  },
];
