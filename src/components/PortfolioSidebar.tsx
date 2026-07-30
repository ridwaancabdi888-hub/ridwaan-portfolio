import {
  BriefcaseBusiness,
  Code2,
  FileText,
  GraduationCap,
  Home,
  Mail,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";
import profileCutout from "../assets/images/profile-cutout.png";
import { personalInfo } from "../data/personalInfo";
import { useActiveSection } from "../hooks/useActiveSection";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import ThemeToggle from "./ThemeToggle";

const navigation = [
  { id: "home", label: "Overview", icon: Home },
  { id: "about", label: "About", icon: UserRound },
  { id: "services", label: "Services", icon: Sparkles },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: BriefcaseBusiness },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

const sectionIds = navigation.map((item) => item.id);

function scrollToSection(id: string, event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", `#${id}`);
}

export default function PortfolioSidebar() {
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <aside className="portfolio-sidebar no-print sticky top-5 hidden h-[calc(100dvh-2.5rem)] w-[270px] shrink-0 flex-col rounded-[1.65rem] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 shadow-2xl shadow-black/25 lg:flex">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-2xl border border-[var(--color-border-hover)] bg-[var(--color-bg)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,255,87,0.22),transparent_68%)]" />
            <img
              src={profileCutout}
              alt={`Portrait of ${personalInfo.fullName}`}
              className="relative h-full w-full object-contain object-bottom"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">
              Ridwaan Mohamed
            </h2>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Full-Stack Developer
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
              <MapPin className="h-3.5 w-3.5 text-[var(--color-accent-cyan)]" aria-hidden="true" />
              {personalInfo.location}
            </p>
          </div>
        </div>

        <nav className="mt-4 min-h-0 flex-1 overflow-y-auto" aria-label="Portfolio sections">
          <ul className="space-y-1">
            {navigation.map(({ id, label, icon: Icon }) => {
              const isActive = activeId === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(event) => scrollToSection(id, event)}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-[var(--color-signal)] text-[#10130b]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                    {isActive ? (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#10130b]" />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-text-primary)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available
            </span>
            <ThemeToggle />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="sidebar-social"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="sidebar-social"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="sidebar-social"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </aside>

      <header className="no-print fixed inset-x-3 top-3 z-50 flex h-14 items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/92 px-3 shadow-xl shadow-black/20 backdrop-blur-xl lg:hidden">
        <a
          href="#home"
          onClick={(event) => scrollToSection("home", event)}
          className="flex items-center gap-2"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-signal)] text-sm font-black text-[#10130b]">
            RM
          </span>
          <span>
            <span className="block text-xs font-bold text-[var(--color-text-primary)]">
              Ridwaan Mohamed
            </span>
            <span className="block text-[10px] text-[var(--color-text-muted)]">
              Portfolio
            </span>
          </span>
        </a>
        <ThemeToggle />
      </header>

      <nav className="mobile-dock no-print fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/94 p-1.5 shadow-2xl shadow-black/35 backdrop-blur-xl lg:hidden" aria-label="Mobile portfolio sections">
        {navigation
          .filter(({ id }) => ["home", "about", "skills", "projects", "contact"].includes(id))
          .map(({ id, label, icon: Icon }) => {
            const isActive = activeId === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => scrollToSection(id, event)}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition ${
                  isActive
                    ? "bg-[var(--color-signal)] text-[#10130b]"
                    : "text-[var(--color-text-muted)]"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="truncate">{label}</span>
              </a>
            );
          })}
      </nav>
    </>
  );
}
