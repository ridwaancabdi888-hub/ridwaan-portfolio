import { Mail, MessageCircle } from "lucide-react";
import { personalInfo } from "../data/personalInfo";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

const socialLinks = [
  { label: "GitHub", href: personalInfo.githubUrl, icon: GithubIcon },
  { label: "LinkedIn", href: personalInfo.linkedinUrl, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
  { label: "WhatsApp", href: personalInfo.whatsappLink, icon: MessageCircle },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
      <div className="container-page flex flex-col items-center gap-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-[var(--color-text-muted)]">
          © {year} {personalInfo.fullName}. All rights reserved.
        </p>

        <ul className="flex items-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent-cyan)]"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
