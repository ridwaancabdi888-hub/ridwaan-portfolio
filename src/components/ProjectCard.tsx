import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  CalendarDays,
  Code2,
  ExternalLink,
  Globe,
  Hammer,
  Layers,
  Server,
  Smartphone,
  Star,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DisplayProject } from "../hooks/useGitHubProjects";
import { GithubIcon } from "./icons/BrandIcons";

const categoryMeta: Record<
  string,
  { label: string; icon: LucideIcon; gradient: string }
> = {
  "full-stack": {
    label: "Full Stack",
    icon: Layers,
    gradient: "from-lime-500/20 via-emerald-500/10 to-transparent",
  },
  frontend: {
    label: "Frontend",
    icon: Boxes,
    gradient: "from-cyan-500/20 via-lime-500/10 to-transparent",
  },
  backend: {
    label: "Backend",
    icon: Server,
    gradient: "from-emerald-500/20 via-lime-500/10 to-transparent",
  },
  mobile: {
    label: "Mobile",
    icon: Smartphone,
    gradient: "from-lime-500/20 via-cyan-500/10 to-transparent",
  },
  system: {
    label: "System Development",
    icon: Server,
    gradient: "from-lime-500/20 via-emerald-500/10 to-transparent",
  },
  wip: {
    label: "Work in Progress",
    icon: Hammer,
    gradient: "from-slate-500/20 via-slate-500/10 to-transparent",
  },
};

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
}

type ProjectCardProps = {
  project: DisplayProject;
  index: number;
};

type ProjectVisualProps = {
  project: DisplayProject;
  imageFailed: boolean;
  onImageError: () => void;
  className?: string;
};

function ProjectVisual({
  project,
  imageFailed,
  onImageError,
  className = "",
}: ProjectVisualProps) {
  const meta = categoryMeta[project.category] ?? categoryMeta.frontend;
  const Icon = meta.icon;

  if (project.image && !imageFailed) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        onError={onImageError}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${meta.gradient} ${className}`}>
      <Icon className="h-12 w-12 text-[var(--color-accent-cyan)]" aria-hidden="true" />
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        Preview coming soon
      </span>
    </div>
  );
}

function ProjectModal({
  project,
  imageFailed,
  onImageError,
  onClose,
}: {
  project: DisplayProject;
  imageFailed: boolean;
  onImageError: () => void;
  onClose: () => void;
}) {
  const meta = categoryMeta[project.category] ?? categoryMeta.frontend;
  const formattedDate = formatDate(project.updatedAt);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/82 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-title-${project.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <motion.article
        initial={{ opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 230, damping: 25 }}
        className="max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-[1.75rem] border border-white/10 bg-[var(--color-bg-elevated)] shadow-2xl shadow-black/55"
      >
        <div className="relative aspect-[16/8.5] min-h-56 overflow-hidden bg-[var(--color-bg)]">
          <ProjectVisual
            project={project}
            imageFailed={imageFailed}
            onImageError={onImageError}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close project details"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:rotate-90 hover:bg-black/80"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            {meta.label}
          </span>
        </div>

        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_280px]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent-cyan)]">
              Selected project
            </p>
            <h3
              id={`project-title-${project.id}`}
              className="mt-3 text-2xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-4xl"
            >
              {project.title}
            </h3>
            <p className="mt-5 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
              {project.description}
            </p>

            <h4 className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Built with
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Project details
            </p>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
                <dt className="text-[var(--color-text-muted)]">Status</dt>
                <dd className="font-semibold text-[var(--color-text-primary)]">{project.status}</dd>
              </div>
              {formattedDate ? (
                <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
                  <dt className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)]">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    Updated
                  </dt>
                  <dd className="font-semibold text-[var(--color-text-primary)]">{formattedDate}</dd>
                </div>
              ) : null}
              {typeof project.stars === "number" ? (
                <div className="flex items-center justify-between gap-4">
                  <dt className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)]">
                    <Star className="h-3.5 w-3.5" aria-hidden="true" />
                    GitHub stars
                  </dt>
                  <dd className="font-semibold text-[var(--color-text-primary)]">{project.stars}</dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-6 space-y-2.5">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-signal)] px-4 py-3 text-sm font-bold text-[#10130b]"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  Open live project
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-border-hover)]"
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
                View source code
              </a>
            </div>
          </aside>
        </div>
      </motion.article>
    </motion.div>,
    document.body,
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const meta = categoryMeta[project.category] ?? categoryMeta.frontend;

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [modalOpen]);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
        className="project-card group flex w-[88vw] max-w-[760px] shrink-0 snap-center flex-col overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-border-hover)] sm:w-[80vw] lg:w-[68vw] xl:grid xl:grid-cols-[1.08fr_0.92fr]"
      >
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label={`Open details for ${project.title}`}
          className="relative min-h-64 overflow-hidden bg-[var(--color-bg)] text-left xl:min-h-[430px]"
        >
          <ProjectVisual
            project={project}
            imageFailed={imageFailed}
            onImageError={() => setImageFailed(true)}
            className="transition duration-700 group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/58 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
            {String(index + 1).padStart(2, "0")} / {meta.label}
          </span>
          <span className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-signal)] text-[#10130b] shadow-xl transition group-hover:rotate-6 group-hover:scale-105">
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>

        <div className="flex flex-col justify-between p-5 sm:p-7">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
                {project.status}
              </span>
              {typeof project.stars === "number" ? (
                <span className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                  <Star className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.stars}
                </span>
              ) : null}
            </div>
            <h3 className="mt-4 text-2xl font-black tracking-tight text-[var(--color-text-primary)]">
              {project.title}
            </h3>
            <p className="mt-3 line-clamp-5 text-sm leading-6 text-[var(--color-text-secondary)]">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 5).map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-text-muted)]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-8 inline-flex w-full items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-accent-cyan)]"
          >
            <span className="inline-flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[var(--color-accent-cyan)]" aria-hidden="true" />
              Explore project
            </span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </motion.article>

      <AnimatePresence>
        {modalOpen ? (
          <ProjectModal
            project={project}
            imageFailed={imageFailed}
            onImageError={() => setImageFailed(true)}
            onClose={() => setModalOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
