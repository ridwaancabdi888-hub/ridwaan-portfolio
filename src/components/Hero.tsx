import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import type { MouseEvent } from "react";
import profileCutout from "../assets/images/profile-cutout.webp";
import { personalInfo } from "../data/personalInfo";
import { projectStats } from "../data/projects";
import { getMotionSafeScrollBehavior } from "../utils/motionPreference.mjs";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons/BrandIcons";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const, delay },
});

const stats = [
  { value: projectStats.total, label: "Projects shipped" },
  { value: projectStats.liveDeployments, label: "Live deployments" },
  { value: projectStats.businessSystems, label: "Business systems" },
  { value: projectStats.technologies, label: "Technologies used" },
];

export default function Hero() {
  const scrollTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: getMotionSafeScrollBehavior(), block: "start" });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="page-glow" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
        <div>
          <motion.p {...fadeUp(0)} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-2)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            {personalInfo.availability}
          </motion.p>

          <motion.h1 {...fadeUp(0.06)} className="mt-7">
            <span className="block text-base font-medium text-[var(--text-2)] md:text-lg">
              {personalInfo.fullName} — {personalInfo.title}
            </span>
            <span className="font-display mt-3 block text-[2.6rem] font-semibold leading-[1.04] text-[var(--text)] sm:text-6xl lg:text-[4.4rem]">
              I engineer <span className="text-[var(--accent)]">business systems</span>, web applications and AI-powered tools.
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.12)} className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-2)] md:text-lg">
            {personalInfo.heroDescription}
          </motion.p>

          <motion.ul {...fadeUp(0.16)} className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
            {personalInfo.focusAreas.map((area) => (
              <li key={area} className="chip">{area}</li>
            ))}
          </motion.ul>

          <motion.div {...fadeUp(0.2)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" onClick={scrollTo("work")} className="btn btn-primary">
              View my work <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={personalInfo.resumePdfPath} download className="btn btn-secondary">
              <Download className="h-4 w-4" aria-hidden="true" /> Download CV
            </a>
            <div className="ml-1 flex items-center gap-2">
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub profile (opens in a new tab)">
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile (opens in a new tab)">
                <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`${personalInfo.whatsappLink}?text=${encodeURIComponent(personalInfo.whatsappPrefilledMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="Message on WhatsApp (opens in a new tab)"
              >
                <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
          className="relative mx-auto w-full max-w-[360px] lg:max-w-none"
        >
          <div className="card relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(80% 60% at 50% 100%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 70%), linear-gradient(180deg, var(--surface-2), var(--surface))",
              }}
            />
            <img
              src={profileCutout}
              alt={`Portrait of ${personalInfo.fullName}`}
              width={720}
              height={900}
              fetchPriority="high"
              className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto object-contain object-bottom"
            />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] px-4 py-3 backdrop-blur-md">
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">{personalInfo.shortName}</p>
                <p className="text-xs text-[var(--text-2)]">{personalInfo.title}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--text-2)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" /> Hargeisa
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container-page relative mt-16 md:mt-20">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-4 [&>div]:bg-[var(--bg)]" style={{ gap: "1px" }}>
          {stats.map((stat) => (
            <div key={stat.label} className="px-5 py-6 md:px-7">
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-3)]">{stat.label}</dt>
              <dd className="font-display mt-2 text-3xl font-semibold text-[var(--text)] md:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
