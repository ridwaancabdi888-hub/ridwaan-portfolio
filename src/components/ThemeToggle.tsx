import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!isDark}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:text-[var(--color-accent-cyan)]"
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-300 ${isDark ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"}`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 ${isDark ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"}`}
        aria-hidden="true"
      />
    </button>
  );
}
