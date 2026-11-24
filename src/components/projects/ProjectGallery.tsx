import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { categories, projects, type CategoryId } from "../../data/projects";
import SectionHeading from "../SectionHeading";
import ProjectModal from "./ProjectModal";
import { ProjectCover, ProjectLinks, StatusBadge } from "./ProjectParts";
import { useProjectDialog } from "./useProjectDialog";

type Filter = CategoryId | "all";

const counts = categories.reduce<Record<string, number>>((acc, c) => {
  acc[c.id] = c.id === "all" ? projects.length : projects.filter((p) => p.categories.includes(c.id as CategoryId)).length;
  return acc;
}, {});

export default function ProjectGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const { selected, open, close } = useProjectDialog();

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );
  const activeLabel = categories.find((c) => c.id === filter)?.label ?? "All projects";

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          eyebrow="All projects"
          title="Everything I've built and shipped."
          subtitle="Filter by the kind of problem solved. Live demo buttons appear only for verified deployments, and source links only for public repositories."
        />

        <div
          role="group"
          aria-label="Filter projects by category"
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0"
        >
          {categories.map((category) => {
            const active = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(category.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-2)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                }`}
              >
                {category.label}
                <span className={`text-xs tabular-nums ${active ? "opacity-70" : "text-[var(--text-3)]"}`}>
                  {counts[category.id]}
                </span>
              </button>
            );
          })}
        </div>

        <p role="status" aria-live="polite" aria-atomic="true" className="mt-4 text-sm text-[var(--text-3)]">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
          {filter === "all" ? "" : ` in ${activeLabel}`}
        </p>

        <motion.ul layout aria-label="Project gallery" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <article className="card card-hover group flex h-full flex-col overflow-hidden">
                  <button
                    type="button"
                    onClick={() => open(project)}
                    className="block text-left"
                    tabIndex={-1}
                      aria-hidden="true"
                  >
                    <ProjectCover project={project} />
                  </button>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-2">
                      <StatusBadge status={project.status} />
                      <span className="font-mono text-[11px] text-[var(--text-3)]">{project.year}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-[var(--text)]">
                      <button type="button" onClick={() => open(project)} className="text-left hover:text-[var(--accent)]">
                        {project.title}
                      </button>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">{project.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <li key={tech} className="chip">{tech}</li>
                      ))}
                      {project.technologies.length > 4 ? (
                        <li className="chip">+{project.technologies.length - 4}</li>
                      ) : null}
                    </ul>
                    <div className="mt-auto pt-5">
                      {project.liveUrl || project.repoUrl ? (
                        <ProjectLinks project={project} />
                      ) : (
                        <button type="button" onClick={() => open(project)} className="btn btn-secondary btn-sm">
                          {project.links?.length ? `View ${project.links.length} live sites` : "View details"}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>{selected ? <ProjectModal project={selected} onClose={close} /> : null}</AnimatePresence>
    </section>
  );
}
