import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "../data/personalInfo";
import { useActiveSection } from "../hooks/useActiveSection";
import { getFocusableElements, getWrappedFocusTarget } from "../utils/focusTrap.mjs";
import { getMotionSafeScrollBehavior } from "../utils/motionPreference.mjs";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

const sectionIds = ["top", ...navLinks.map((l) => l.id), "projects", "github"];
const ACTIVE_SECTION_EVENT = "portfolio:active-section";

/** Maps sub-sections to the nav item that should light up for them. */
function navIdFor(sectionId: string) {
  if (sectionId === "projects") return "work";
  if (sectionId === "github") return "journey";
  return sectionId;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = navIdFor(useActiveSection(sectionIds));
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => getFocusableElements(panel ?? document)[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key === "Tab" && panel) {
        const target = getWrappedFocusTarget(getFocusableElements(panel), document.activeElement, event.shiftKey);
        if (target) {
          event.preventDefault();
          target.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const go = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const scroll = () => {
      window.dispatchEvent(new CustomEvent(ACTIVE_SECTION_EVENT, { detail: id }));
      target.scrollIntoView({ behavior: getMotionSafeScrollBehavior(), block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    };
    if (open) {
      // Release the mobile menu's body scroll lock first, otherwise the scroll is cancelled.
      document.body.style.overflow = "";
      setOpen(false);
      window.setTimeout(scroll, 30);
    } else {
      scroll();
    }
  };

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" onClick={go("top")} className="group flex items-center gap-2.5" aria-label={`${personalInfo.fullName} — back to top`}>
          <span className="font-display inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--text)] text-sm font-bold text-[var(--bg)]">
            {personalInfo.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-[var(--text)] sm:block">
            {personalInfo.shortName}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  aria-current={active ? "location" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "text-[var(--text)]" : "text-[var(--text-2)] hover:text-[var(--text)]"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-[var(--accent)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" onClick={go("contact")} className="btn btn-primary btn-sm hidden sm:inline-flex">
            Hire me
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[var(--border)] bg-[var(--bg)] lg:hidden"
            style={{ height: "calc(100dvh - 4rem)" }}
          >
            <ul className="container-page flex flex-col gap-1 py-6">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={go(link.id)}
                    aria-current={activeId === link.id ? "location" : undefined}
                    className={`font-display flex items-center justify-between rounded-xl px-3 py-3.5 text-2xl font-semibold ${
                      activeId === link.id ? "text-[var(--accent)]" : "text-[var(--text)]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-6 px-3">
                <a href="#contact" onClick={go("contact")} className="btn btn-primary w-full">
                  Start a project
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
