import { personalInfo } from "../data/personalInfo";
import GitHubProjects from "./GitHubProjects";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="no-print scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work"
          subtitle={`Live from my GitHub — ${personalInfo.githubUsername}. Repository data (stars, language, last update) is fetched in real time; nothing here is fabricated.`}
        />
        <GitHubProjects />
      </div>
    </section>
  );
}
