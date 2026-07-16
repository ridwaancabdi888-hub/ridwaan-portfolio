import { motion } from "framer-motion";
import { services } from "../data/services";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section id="services" className="no-print scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="What I Do"
          title="Services"
          subtitle="Practical development work across the full stack — from interfaces to databases, plus structured prompt engineering for AI-assisted builds."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent-cyan)] transition-transform group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
