import { useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, DatabaseZap } from "lucide-react";
import { projectCategories, type ProjectCategory } from "../data/projects";
import { useGitHubProjects } from "../hooks/useGitHubProjects";
import ProjectCard from "./ProjectCard";

function SkeletonCard() {
  return (
    <div className="w-[80vw] max-w-[760px] shrink-0 animate-pulse overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="h-44 w-full bg-[var(--color-surface-hover)]" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded bg-[var(--color-surface-hover)]" />
        <div className="h-3 w-full rounded bg-[var(--color-surface-hover)]" />
        <div className="h-3 w-5/6 rounded bg-[var(--color-surface-hover)]" />
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-14 rounded-full bg-[var(--color-surface-hover)]" />
          <div className="h-5 w-14 rounded-full bg-[var(--color-surface-hover)]" />
        </div>
      </div>
    </div>
  );
}

export default function GitHubProjects() {
  const { projects, loading, error, usingCache } = useGitHubProjects();
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const railRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.category === filter);
  }, [projects, filter]);

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.82, 760),
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {projectCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilter(category.id)}
              aria-pressed={filter === category.id}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filter === category.id
                  ? "border-[var(--color-signal)] bg-[var(--color-signal)] text-[#10130b]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Drag or use arrows
          </span>
          <button
            type="button"
            onClick={() => moveRail(-1)}
            aria-label="Previous projects"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] transition hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => moveRail(1)}
            aria-label="Next projects"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-signal)] text-[#10130b] transition hover:brightness-105"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {error ? (
        <div className="mb-8 flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            Live GitHub data couldn&apos;t be loaded right now ({error}). Showing
            saved project information instead.
          </p>
        </div>
      ) : usingCache ? (
        <div className="mb-8 flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
          <DatabaseZap className="h-4 w-4 shrink-0" aria-hidden="true" />
          <p>Showing recently cached GitHub data to keep things fast.</p>
        </div>
      ) : null}

      {loading && projects.length === 0 ? (
        <div className="flex gap-5 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-[var(--color-text-muted)]">
          No projects in this category yet.
        </p>
      ) : (
        <div
          ref={railRef}
          className="project-rail -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8"
        >
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
