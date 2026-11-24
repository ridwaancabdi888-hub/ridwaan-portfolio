import { AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "../../data/projects";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import ProjectModal from "./ProjectModal";
import { categoryLabel } from "./projectUtils";
import { ProjectCover, ProjectLinks, StatusBadge } from "./ProjectParts";
import { useProjectDialog } from "./useProjectDialog";

export default function FeaturedProjects() {
  const { selected, open, close } = useProjectDialog();

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          eyebrow="Featured projects"
          title="Selected work, running in production."
          subtitle="Systems and products built for real organisations — each with a verified live deployment."
        />

        <ul className="space-y-6 md:space-y-8">
          {featuredProjects.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <Reveal as="li" key={project.id}>
                <article className="card group overflow-hidden">
                  <div className={`grid items-stretch lg:grid-cols-[1.15fr_0.85fr] ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <button
                      type="button"
                      onClick={() => open(project)}
                      className={`block h-full text-left ${reversed ? "lg:border-l" : "lg:border-r"} border-[var(--border)]`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <ProjectCover project={project} fill className="lg:!border-b-0" />
                    </button>

                    <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-[var(--text-3)]">{String(index + 1).padStart(2, "0")}</span>
                        <StatusBadge status={project.status} />
                        <span className="text-xs text-[var(--text-3)]">{categoryLabel(project.categories[0])}</span>
                      </div>
                      <h3 className="font-display mt-5 text-2xl font-semibold text-[var(--text)] sm:text-[1.75rem] sm:leading-tight">
                        {project.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-[var(--text-2)]">{project.summary}</p>
                      <ul className="mt-5 space-y-1.5 text-sm text-[var(--text-2)]">
                        {project.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <li key={tech} className="chip">{tech}</li>
                        ))}
                      </ul>
                      <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
                        <ProjectLinks project={project} />
                        <button type="button" onClick={() => open(project)} className="btn btn-ghost btn-sm">
                          Case details <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>{selected ? <ProjectModal project={selected} onClose={close} /> : null}</AnimatePresence>
    </section>
  );
}
