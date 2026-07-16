import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  GraduationCap,
  MapPin,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { personalInfo } from "../data/personalInfo";
import SectionHeading from "./SectionHeading";

const cardIcons = [MapPin, GraduationCap, Award, Target, Sparkles, Briefcase, User];

export default function About() {
  const bioParagraphs = personalInfo.bio.split("\n\n");

  return (
    <section id="about" className="no-print scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="About Me" title="Get to know me" />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-3"
          >
            {bioParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mb-4 text-base leading-relaxed text-[var(--color-text-secondary)]"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--color-border)] pt-8">
              {personalInfo.aboutStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-gradient sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)] sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1"
          >
            {personalInfo.aboutCards.map((card, index) => {
              const Icon = cardIcons[index % cardIcons.length];
              return (
                <div
                  key={card.label}
                  className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-border-hover)]"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent-cyan)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                      {card.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-[var(--color-text-primary)]">
                      {card.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
