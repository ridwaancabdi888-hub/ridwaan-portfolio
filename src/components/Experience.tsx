import { motion } from "framer-motion";
import { CheckCircle2, Cpu, GitBranch, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { practicalExperience } from "../data/education";
import SectionHeading from "./SectionHeading";

const icons: Record<string, LucideIcon> = {
  "system-development": Wrench,
  "prompt-engineering": Cpu,
  "github-development": GitBranch,
};

export default function Experience() {
  return (
    <section id="experience" className="no-print scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          title="Practical Experience and Areas of Work"
          subtitle="Hands-on experience gained through personal and academic projects — not prior employment."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {practicalExperience.map((group, index) => {
            const Icon = icons[group.id] ?? Wrench;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent-cyan)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-cyan)]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
