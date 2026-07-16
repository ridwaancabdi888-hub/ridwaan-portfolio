import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { personalInfo } from "../data/personalInfo";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

const ROTATE_INTERVAL_MS = 2600;

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % personalInfo.rotatingTitles.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="no-print relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 animate-blob rounded-full bg-[var(--color-accent)]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/5 h-80 w-80 animate-blob rounded-full bg-[var(--color-accent-cyan)]/15 blur-3xl"
        style={{ animationDelay: "-6s" }}
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {personalInfo.availabilityShort}
          </span>

          <p className="mt-6 text-base font-medium text-[var(--color-accent-cyan)]">
            {personalInfo.heroIntro}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            {personalInfo.fullName}
          </h1>

          <div className="mt-4 h-9 text-xl font-semibold sm:text-2xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-gradient inline-block"
              >
                {personalInfo.rotatingTitles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:mx-0">
            {personalInfo.heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="rounded-lg bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/20 transition-colors hover:bg-[var(--color-accent-soft)]"
            >
              View My Projects
            </button>
            <a
              href={personalInfo.resumePdfPath}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-border-hover)]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Contact Me
            </button>
          </div>

          <ul className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            {[
              { label: "GitHub", href: personalInfo.githubUrl, icon: GithubIcon },
              { label: "LinkedIn", href: personalInfo.linkedinUrl, icon: LinkedinIcon },
              { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
              { label: "WhatsApp", href: personalInfo.whatsappLink, icon: MessageCircle },
            ].map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent-cyan)]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto flex justify-center"
        >
          <div className="relative">
            <div
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-[var(--color-accent)]/30 to-[var(--color-accent-cyan)]/20 blur-2xl"
              aria-hidden="true"
            />
            <img
              src={personalInfo.avatarUrl}
              alt={`Portrait of ${personalInfo.fullName}`}
              width={288}
              height={288}
              loading="eager"
              fetchPriority="high"
              className="h-56 w-56 rounded-full border-4 border-[var(--color-accent)]/60 object-cover shadow-2xl shadow-black/30 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
            />
            <span
              className="absolute bottom-4 right-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--color-bg)] bg-emerald-400 sm:h-7 sm:w-7"
              title="Available"
            >
              <span className="sr-only">Available for work</span>
            </span>
          </div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo("about")}
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-text-muted)] sm:flex"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  );
}
