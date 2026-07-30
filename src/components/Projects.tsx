import GitHubProjects from "./GitHubProjects";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="no-print scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects that solve real problems"
          subtitle="Move through the showcase, open any project for full details, then explore the live product or its source code."
        />
        <GitHubProjects />
      </div>
    </section>
  );
}
