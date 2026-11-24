import { personalInfo } from "../data/personalInfo";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

export default function Footer() {
  return (
    <footer className="no-print border-t border-[var(--border)]">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-[var(--text-3)] sm:flex-row">
        <p>
          © {new Date().getFullYear()} {personalInfo.fullName}. Built with React, TypeScript & Tailwind CSS.
        </p>
        <div className="flex items-center gap-2">
          <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub (opens in a new tab)">
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn (opens in a new tab)">
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
