import { useState } from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  Clock,
  ExternalLink,
  Globe,
  Hammer,
  Layers,
  Server,
  Smartphone,
  Star,
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
    gradient: "from-blue-500/25 via-cyan-500/15 to-transparent",
  },
  frontend: {
    label: "Frontend",
    icon: Boxes,
    gradient: "from-cyan-500/25 via-blue-500/10 to-transparent",
  },
  backend: {
    label: "Backend",
    icon: Server,
    gradient: "from-indigo-500/25 via-blue-500/10 to-transparent",
  },
  mobile: {
    label: "Mobile",
    icon: Smartphone,
    gradient: "from-sky-500/25 via-cyan-500/10 to-transparent",
  },
  system: {
    label: "System Development",
    icon: Server,
    gradient: "from-blue-600/25 via-indigo-500/10 to-transparent",
  },
  wip: {
    label: "Work in Progress",
    icon: Hammer,
    gradient: "from-slate-500/25 via-slate-500/10 to-transparent",
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

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const meta = categoryMeta[project.category] ?? categoryMeta.frontend;
  const Icon = meta.icon;
  const showRealImage = Boolean(project.image) && !imageFailed;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-border-hover)]"
    >
      <div className={`relative h-44 w-full overflow-hidden bg-gradient-to-br ${meta.gradient} bg-[var(--color-bg-elevated)]`}>
        {showRealImage ? (
          <img
            src={project.image}
            alt={`Cover art for ${project.title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <Icon className="h-10 w-10 text-[var(--color-text-muted)]" aria-hidden="true" />
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
              Generated thumbnail — no screenshot yet
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/80 px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-secondary)] backdrop-blur">
          {meta.label}
        </span>
        {project.status === "Work in progress" ? (
          <span className="absolute right-3 top-3 rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-medium text-amber-400">
            Work in Progress
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {project.description}
        </p>

        {project.technologies.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-text-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-4 flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
          {typeof project.stars === "number" ? (
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5" aria-hidden="true" />
              {project.stars}
            </span>
          ) : null}
          {project.updatedAt ? (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Updated {formatDate(project.updatedAt)}
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
            Code
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-cyan)] transition-colors hover:text-[var(--color-accent-soft)]"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              Live Demo
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
