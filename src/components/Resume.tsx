import { motion } from "framer-motion";
import { Download, Mail, MapPin, Phone, Printer } from "lucide-react";
import { personalInfo } from "../data/personalInfo";
import { educationTimeline } from "../data/education";
import { featuredProjects } from "../data/projects";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import SectionHeading from "./SectionHeading";

const coreSkills = [
  "Full-Stack Web Development",
  "System Development",
  "Prompt Engineering",
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "PHP",
  "Laravel",
  "MySQL",
  "MariaDB",
  "MongoDB",
  "Flutter",
  "REST APIs",
  "Git and GitHub",
];

const professionalInterests = [
  "Full-Stack Web Development",
  "System Development",
  "Prompt Engineering",
  "Mobile Development",
  "Database Systems",
  "Networking",
  "GIS and Mapping",
  "Artificial Intelligence",
];

export default function Resume() {
  const handlePrint = () => window.print();

  return (
    <section id="resume" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Resume"
          title="One-page CV"
          subtitle="A concise summary of my education, skills and selected projects — download the PDF or print directly."
        />

        <div className="no-print mb-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={personalInfo.resumePdfPath}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-soft)]"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download PDF CV
          </a>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-border-hover)]"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print CV
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          id="resume-print-area"
          className="resume-print mx-auto max-w-3xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10 print:m-0 print:max-w-none print:rounded-none print:border-0 print:p-0"
        >
          <header className="border-b border-[var(--color-border)] pb-5">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
              {personalInfo.fullName}
            </h3>
            <p className="mt-1 text-sm font-medium text-[var(--color-accent-cyan)]">
              Full-Stack Web Developer · System Developer · Prompt Engineer · Software
              Engineering Student
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--color-text-secondary)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {personalInfo.location}
              </span>
              <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-1.5 hover:text-[var(--color-text-primary)]">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[var(--color-text-primary)]"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {personalInfo.whatsappNumber}
              </a>
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[var(--color-text-primary)]"
              >
                <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                github.com/{personalInfo.githubUsername}
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[var(--color-text-primary)]"
              >
                <LinkedinIcon className="h-3.5 w-3.5" aria-hidden="true" />
                linkedin.com/in/{personalInfo.linkedinUsername}
              </a>
            </div>
          </header>

          <section className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
              Professional Summary
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Advanced Full-Stack Web Developer, System Developer, Prompt Engineer and
              Software Engineering student with practical experience building responsive
              interfaces, REST APIs, database-driven applications and complete management
              systems. Experienced in organizing software requirements, designing systems
              and using AI coding tools through structured prompt engineering. Interested
              in web development, mobile applications, networking, GIS and modern software
              technologies.
            </p>
          </section>

          <section className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
              Education
            </h4>
            <div className="mt-2 space-y-2">
              {educationTimeline.map((entry) => (
                <div key={entry.id} className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {entry.degree}
                    {entry.institution !== "Secondary Education" ? ` — ${entry.institution}` : ""}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">{entry.period}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
              Core Skills
            </h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {coreSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[11px] text-[var(--color-text-secondary)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
              Selected Projects
            </h4>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--color-text-secondary)]">
              {featuredProjects.map((project) => (
                <li key={project.id}>{project.title}</li>
              ))}
            </ul>
          </section>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <section>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                Languages
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-[var(--color-text-secondary)]">
                {personalInfo.languages.map((lang) => (
                  <li key={lang.name}>
                    {lang.name}: <span className="text-[var(--color-text-primary)]">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                Professional Interests
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-[var(--color-text-secondary)]">
                {professionalInterests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
