import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Download,
  Mail,
  Sparkles,
} from "lucide-react";
import profileCutout from "../assets/images/profile-cutout.png";
import { personalInfo } from "../data/personalInfo";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons/BrandIcons";

const socialLinks = [
  { label: "GitHub", href: personalInfo.githubUrl, icon: GithubIcon },
  { label: "LinkedIn", href: personalInfo.linkedinUrl, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
  {
    label: `WhatsApp ${personalInfo.whatsappNumber}`,
    href: personalInfo.whatsappLink,
    icon: WhatsAppIcon,
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section
      id="home"
      className="no-print flex min-h-[calc(100dvh-5.5rem)] items-center overflow-hidden py-12 sm:py-16 lg:min-h-[calc(100dvh-5.5rem)] lg:py-10"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--color-signal)]/10 blur-[110px]" />

      <div className="container-page relative">
        <div className="grid items-center gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)]">
                <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent-cyan)]" aria-hidden="true" />
                PORTFOLIO / 2026
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1.5 text-xs font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </span>
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
              Hello, I&apos;m Ridwaan
            </p>
            <h1 className="mt-4 max-w-3xl text-[clamp(3.25rem,7vw,7.2rem)] font-black uppercase leading-[0.83] tracking-[-0.07em] text-[var(--color-text-primary)]">
              Building
              <span className="block text-[var(--color-accent-cyan)]">digital systems.</span>
            </h1>

            <div className="mt-6 inline-flex max-w-full items-center gap-3 rounded-2xl border border-[var(--color-signal)]/30 bg-[var(--color-surface)]/90 px-4 py-3 shadow-[0_0_32px_rgba(217,255,87,0.11)] backdrop-blur-xl sm:gap-4 sm:px-5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-signal)]/25 bg-[var(--color-signal)]/10 text-[var(--color-accent-cyan)]">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)] sm:text-[10px]">
                  Currently:
                </span>
                <span className="mt-0.5 block text-sm font-black leading-tight text-[var(--color-text-primary)] sm:text-base">
                  Full-Stack &amp; System Developer
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">
              {personalInfo.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-signal)] px-5 py-3 text-sm font-bold text-[#10130b] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Explore my work
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={personalInfo.resumePdfPath}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--color-border-hover)]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
            </div>

            <ul className="mt-8 flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] transition hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-2xl shadow-black/35">
              <div className="relative min-h-[500px] overflow-hidden rounded-[1.55rem] border border-[var(--color-border)] bg-[var(--color-bg)] sm:min-h-[580px]">
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(217,255,87,0.09),transparent_44%),radial-gradient(circle_at_50%_42%,rgba(217,255,87,0.16),transparent_38%)]" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    Developer profile
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] text-[var(--color-accent-cyan)]">
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    Verified
                  </span>
                </div>

                <img
                  src={profileCutout}
                  alt={`Portrait of ${personalInfo.fullName}`}
                  width={520}
                  height={620}
                  loading="eager"
                  fetchPriority="high"
                  className="absolute inset-x-0 bottom-0 mx-auto h-[88%] w-auto object-contain object-bottom"
                  style={{
                    filter:
                      "drop-shadow(0 0 20px rgba(217,255,87,0.26)) drop-shadow(0 28px 50px rgba(0,0,0,0.5))",
                    maskImage: "linear-gradient(to bottom, black 78%, transparent 99%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 99%)",
                  }}
                />

                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/62 p-4 backdrop-blur-xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
                    Based in Hargeisa
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xl font-bold text-white">Ridwaan Mohamed</p>
                      <p className="mt-1 text-xs text-white/60">Software Engineering · Gollis University</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollTo("contact")}
                      aria-label="Go to contact section"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-signal)] text-[#10130b] transition hover:rotate-6"
                    >
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-5 top-24 hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/90 p-3 shadow-xl backdrop-blur-xl sm:block">
              <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Focus
              </p>
              <p className="mt-1 text-sm font-bold text-[var(--color-text-primary)]">
                Full-stack systems
              </p>
            </div>

            <div className="absolute -right-4 top-1/3 hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/90 p-3 shadow-xl backdrop-blur-xl sm:block">
              <p className="text-2xl font-black text-[var(--color-accent-cyan)]">9+</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                Projects
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
