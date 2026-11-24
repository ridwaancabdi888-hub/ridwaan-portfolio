import { ArrowUpRight, Layers } from "lucide-react";
import { useState } from "react";
import type { Project, ProjectStatus } from "../../data/projects";
import { GithubIcon } from "../icons/BrandIcons";
import { hostOf } from "./projectUtils";

const statusStyles: Record<ProjectStatus, string> = {
  Live: "bg-emerald-500",
  "In development": "bg-amber-500",
  Completed: "bg-sky-500",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] px-2.5 py-1 text-[11px] font-medium text-[var(--text)] backdrop-blur-md">
      <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[status]}`} aria-hidden="true" />
      {status}
    </span>
  );
}

type CoverProps = {
  project: Project;
  eager?: boolean;
  /** Stretch to the parent height instead of a fixed 16:10 frame. */
  fill?: boolean;
  className?: string;
};

/** Screenshot inside a minimal browser frame; typographic fallback when no screenshot exists. */
export function ProjectCover({ project, eager = false, fill = false, className = "" }: CoverProps) {
  const [failed, setFailed] = useState(false);
  const url = project.liveUrl ?? project.links?.[0]?.url;

  return (
    <div className={`shot ${fill ? "flex h-full flex-col" : ""} ${className}`}>
      <div className="flex h-7 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-3">
        <div className="browser-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="truncate font-mono text-[10px] text-[var(--text-3)]">
          {url ? hostOf(url) : "private repository"}
        </span>
      </div>
      <div className={fill ? "aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[320px] lg:flex-1" : "aspect-[16/10] overflow-hidden"}>
        {project.image && !failed ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={1200}
            height={750}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="cover-fallback flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
            <Layers className="h-8 w-8 text-[var(--accent)]" aria-hidden="true" />
            <span className="font-display text-lg font-semibold text-[var(--text)]">{project.title}</span>
            <span className="text-xs text-[var(--text-3)]">{project.technologies.slice(0, 3).join(" · ")}</span>
          </div>
        )}
      </div>
    </div>
  );
}

type LinksProps = {
  project: Project;
  size?: "sm" | "md";
};

/** Live Demo / Source buttons. Only rendered for verified deployments and public repositories. */
export function ProjectLinks({ project, size = "sm" }: LinksProps) {
  const sizeClass = size === "sm" ? "btn-sm" : "";
  return (
    <div className="flex flex-wrap gap-2">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-primary ${sizeClass}`}
          aria-label={`Open the live demo of ${project.title} (opens in a new tab)`}
        >
          Live demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : null}
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-secondary ${sizeClass}`}
          aria-label={`View the source code of ${project.title} on GitHub (opens in a new tab)`}
        >
          <GithubIcon className="h-4 w-4" aria-hidden="true" /> Source
        </a>
      ) : null}
    </div>
  );
}
