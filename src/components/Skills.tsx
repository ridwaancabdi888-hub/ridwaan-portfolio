import { Blocks, Bot, Database, Layout, ShieldCheck, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillGroups } from "../data/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const icons: Record<string, LucideIcon> = {
  frontend: Layout,
  backend: Blocks,
  data: Database,
  ai: Bot,
  "mobile-3d": Smartphone,
  quality: ShieldCheck,
};

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Technical skills"
          title="A full-stack toolkit, proven in production."
          subtitle="Every skill below is used in at least one shipped project on this page."
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.id] ?? Blocks;
            return (
              <Reveal as="li" key={group.id} delay={index * 0.04} className="card card-hover p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--text)]">{group.title}</h3>
                    <p className="text-xs text-[var(--text-3)]">{group.description}</p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${group.title} skills`}>
                  {group.skills.map((skill) => (
                    <li key={skill} className="chip">{skill}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
