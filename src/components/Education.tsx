import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { educationTimeline } from "../data/education";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="no-print scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Education" title="Academic background" />

        <ol className="relative mx-auto max-w-3xl border-l border-[var(--color-border)] pl-8">
          {educationTimeline.map((entry, index) => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="relative pb-10 last:pb-0"
            >
              <span className="absolute -left-[38px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-bg)] text-[var(--color-accent-cyan)]">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
              </span>

              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {entry.degree}
                  </h3>
                  <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
                    {entry.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--color-accent-cyan)]">
                  {entry.institution}
                </p>
                {entry.location ? (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {entry.location}
                  </p>
                ) : null}

                {entry.areas ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.areas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1 text-xs text-[var(--color-text-secondary)]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
