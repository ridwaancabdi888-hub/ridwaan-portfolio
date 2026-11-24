import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { personalInfo } from "../data/personalInfo";
import { projects, projectStats } from "../data/projects";
import { GithubIcon } from "./icons/BrandIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Profile = { public_repos: number; created_at: string };

const CACHE_KEY = "gh-profile-v2";
const CACHE_TTL_MS = 1000 * 60 * 60;

/** Most-used technologies across the catalogue, normalised so "Next.js 15" and "Next.js 16" count together. */
function topTechnologies(limit: number) {
  const normalise = (t: string) =>
    t
      .replace(/\s+\d+(\.\d+)*$/, "")
      .replace(/^Supabase Storage$/, "Supabase")
      .replace(/^MySQL \/ MariaDB$/, "MySQL");
  const counts = new Map<string, number>();
  for (const p of projects) {
    for (const t of new Set(p.technologies.map(normalise))) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

const top = topTechnologies(8);
const max = top[0]?.[1] ?? 1;
const publicRepoLinks = projects.filter((p) => p.repoUrl).length;

export default function GitHubStats() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let cancelled = false;
    try {
      const cached = JSON.parse(window.localStorage.getItem(CACHE_KEY) ?? "null") as { t: number; p: Profile } | null;
      if (cached && Date.now() - cached.t < CACHE_TTL_MS) {
        setProfile(cached.p);
        return;
      }
    } catch {
      // ignore corrupt cache
    }
    fetch(`https://api.github.com/users/${personalInfo.githubUsername}`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Profile) => {
        if (cancelled) return;
        const p = { public_repos: data.public_repos, created_at: data.created_at };
        setProfile(p);
        try {
          window.localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), p }));
        } catch {
          // storage unavailable — caching is optional
        }
      })
      .catch(() => {
        // Offline or rate-limited: the section still shows catalogue-derived stats.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = [
    { label: "Public repositories", value: profile ? String(profile.public_repos) : "—", note: "Live from the GitHub API" },
    { label: "Open-source projects here", value: String(publicRepoLinks), note: "With a public Source link" },
    { label: "Live deployments", value: String(projectStats.liveDeployments), note: "Verified links on this page" },
    { label: "Technologies shipped", value: String(projectStats.technologies), note: "Across all projects" },
  ];

  return (
    <section id="github" className="section" aria-labelledby="github-title">
      <div className="container-page">
        <SectionHeading
          id="github-title"
          eyebrow="GitHub activity"
          title="Verified numbers, not vanity metrics."
          subtitle="Repository count comes live from GitHub; everything else is computed from the projects listed on this page."
          action={
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <GithubIcon className="h-4 w-4" aria-hidden="true" /> @{personalInfo.githubUsername}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          }
        />

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <dl className="grid h-full grid-cols-2 gap-4">
              {cards.map((card) => (
                <div key={card.label} className="card p-5">
                  <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-3)]">{card.label}</dt>
                  <dd className="font-display mt-3 text-4xl font-semibold text-[var(--text)]">{card.value}</dd>
                  <dd className="mt-1 text-xs text-[var(--text-3)]">{card.note}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.06} className="card p-6">
            <h3 className="text-sm font-semibold text-[var(--text)]">Most-used technologies</h3>
            <p className="mt-1 text-xs text-[var(--text-3)]">Number of projects on this page using each technology</p>
            <ul className="mt-6 space-y-3.5">
              {top.map(([tech, count]) => (
                <li key={tech} className="grid grid-cols-[8.5rem_1fr_2rem] items-center gap-3 text-sm">
                  <span className="truncate text-[var(--text-2)]">{tech}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-[var(--surface-2)]" aria-hidden="true">
                    <span
                      className="block h-full rounded-full bg-[var(--accent)]"
                      style={{ width: `${Math.max(8, (count / max) * 100)}%` }}
                    />
                  </span>
                  <span className="text-right tabular-nums text-[var(--text)]">{count}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
