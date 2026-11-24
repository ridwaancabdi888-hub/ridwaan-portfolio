import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Lock, X } from "lucide-react";
import type { Project } from "../../data/projects";
import { getFocusableElements, getWrappedFocusTarget } from "../../utils/focusTrap.mjs";
import { categoryLabel } from "./projectUtils";
import { ProjectCover, ProjectLinks, StatusBadge } from "./ProjectParts";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

/** Accessible project details dialog: traps focus, closes on Escape/backdrop, restores focus to its opener. */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => {
      if (!dialogRef.current) return;
      const first = getFocusableElements(dialogRef.current)[0];
      (first ?? dialogRef.current).focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const target = getWrappedFocusTarget(
          getFocusableElements(dialogRef.current),
          document.activeElement,
          event.shiftKey,
        );
        if (target) {
          event.preventDefault();
          target.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (openerRef.current?.isConnected) {
        openerRef.current.focus();
      }
    };
  }, [onClose]);

  const titleId = `project-title-${project.id}`;
  const hasSource = Boolean(project.repoUrl);

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-[var(--border)] bg-[var(--bg-soft)] shadow-2xl sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="icon-btn absolute right-4 top-4 z-10"
          aria-label="Close project details"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <ProjectCover project={project} eager />

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            {project.categories.map((c) => (
              <span key={c} className="chip">{categoryLabel(c)}</span>
            ))}
          </div>

          <h3 id={titleId} className="font-display mt-4 text-2xl font-semibold text-[var(--text)] sm:text-3xl">
            {project.title}
          </h3>
          {project.builtFor ? (
            <p className="mt-1 text-sm text-[var(--text-3)]">Built for {project.builtFor}</p>
          ) : null}
          <p className="mt-4 leading-relaxed text-[var(--text-2)]">{project.description}</p>

          <div className="mt-7 grid gap-7 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-3)]">Key features</h4>
              <ul className="mt-3 space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-[var(--text-2)]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-3)]">Tech stack</h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <li key={tech} className="chip">{tech}</li>
                ))}
              </ul>
            </div>
          </div>

          {project.links?.length ? (
            <div className="mt-7">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-3)]">Live sites</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {project.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--border-strong)]"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4 text-[var(--text-3)]" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.note ? (
            <p className="mt-7 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-2)]">
              {project.note}
            </p>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-6">
            <ProjectLinks project={project} size="md" />
            {!hasSource ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-3)]">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Source code is private
              </span>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
