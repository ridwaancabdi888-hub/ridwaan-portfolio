import { useEffect, useState } from "react";
import {
  featuredProjects,
  githubApiEndpoint,
  repoImageByName,
  watchedRepoNames,
  type LocalProject,
  type ProjectCategory,
} from "../data/projects";

const CACHE_KEY = "github-projects-cache-v1";
const CACHE_TTL_MS = 1000 * 60 * 30;

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  size: number;
  topics?: string[];
};

export type DisplayProject = {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl?: string;
  technologies: string[];
  language?: string | null;
  stars?: number;
  updatedAt?: string;
  category: Exclude<ProjectCategory, "all">;
  status: "Major project" | "Work in progress";
  featured: boolean;
  source: "local" | "github";
  image?: string;
};

type FetchState = {
  projects: DisplayProject[];
  loading: boolean;
  error: string | null;
  usingCache: boolean;
};

function repoNameFromUrl(url: string) {
  return url.replace(/\/+$/, "").split("/").pop() ?? "";
}

/** A repo counts as meaningful once it has a real description or a
 * non-trivial amount of code, so empty/placeholder repos fall back to WIP. */
function isMeaningfulRepo(repo: GitHubRepo) {
  const hasDescription = Boolean(repo.description && repo.description.trim().length > 0);
  const hasSubstantialSize = repo.size > 20;
  return hasDescription || hasSubstantialSize;
}

/** Best-effort grouping for filtering only — inferred from the repo's
 * primary language/topics, not a claim about the project's real scope. */
function inferCategory(repo: GitHubRepo): Exclude<ProjectCategory, "all"> {
  const language = (repo.language ?? "").toLowerCase();
  const topics = (repo.topics ?? []).map((t) => t.toLowerCase());
  const name = repo.name.toLowerCase();

  if (language === "dart" || topics.includes("flutter")) return "mobile";
  if (
    topics.includes("full-stack") ||
    topics.includes("fullstack") ||
    name.includes("full-stack") ||
    name.includes("fullstack")
  )
    return "full-stack";
  if (["php", "python", "java", "c++", "c#"].includes(language)) return "backend";
  return "frontend";
}

function buildLocalOverrideMap() {
  const map = new Map<string, LocalProject>();
  featuredProjects.forEach((project) => {
    map.set(repoNameFromUrl(project.repo).toLowerCase(), project);
  });
  return map;
}

function localOverrideToDisplay(project: LocalProject): DisplayProject {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    repoUrl: project.repo,
    technologies: project.technologies,
    category: project.category,
    status: project.status,
    featured: project.featured,
    source: "local",
    image: project.image,
  };
}

function toDisplayProject(repo: GitHubRepo, override?: LocalProject): DisplayProject {
  const meaningful = isMeaningfulRepo(repo);
  const hasRealHomepage = Boolean(repo.homepage && repo.homepage.trim().length > 0);

  if (override) {
    return {
      id: override.id,
      title: override.title,
      description: override.description,
      repoUrl: repo.html_url,
      liveUrl: hasRealHomepage ? repo.homepage! : undefined,
      technologies: override.technologies,
      language: repo.language,
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
      category: override.category,
      status: override.status,
      featured: override.featured,
      source: "local",
      image: override.image,
    };
  }

  return {
    id: `gh-${repo.id}`,
    title: repo.name,
    description:
      repo.description?.trim() || "No description provided in this repository yet.",
    repoUrl: repo.html_url,
    liveUrl: hasRealHomepage ? repo.homepage! : undefined,
    technologies: repo.language ? [repo.language] : [],
    language: repo.language,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    category: meaningful ? inferCategory(repo) : "wip",
    status: meaningful ? "Major project" : "Work in progress",
    featured: false,
    source: "github",
    image: repoImageByName[repo.name.toLowerCase()],
  };
}

function mergeRepos(repos: GitHubRepo[]): DisplayProject[] {
  const overrides = buildLocalOverrideMap();
  const watchedLower = watchedRepoNames.map((n) => n.toLowerCase());
  const usedOverrides = new Set<string>();
  const liveProjects: DisplayProject[] = [];

  for (const repo of repos) {
    if (repo.fork) continue;
    const key = repo.name.toLowerCase();
    const override = overrides.get(key);
    const isWatched = watchedLower.includes(key);
    if (!override && !isWatched) continue;

    if (override) usedOverrides.add(key);
    liveProjects.push(toDisplayProject(repo, override));
  }

  const missingFeatured = featuredProjects
    .filter((p) => !usedOverrides.has(repoNameFromUrl(p.repo).toLowerCase()))
    .map(localOverrideToDisplay);

  const all = [...liveProjects, ...missingFeatured];

  return all.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.status !== b.status) return a.status === "Major project" ? -1 : 1;
    return (b.stars ?? 0) - (a.stars ?? 0);
  });
}

function localFallback(): DisplayProject[] {
  return featuredProjects.map(localOverrideToDisplay);
}

export function useGitHubProjects() {
  const [state, setState] = useState<FetchState>({
    projects: localFallback(),
    loading: true,
    error: null,
    usingCache: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const cachedRaw = window.localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as {
            timestamp: number;
            repos: GitHubRepo[];
          };
          if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
            if (isMounted) {
              setState((prev) => ({
                ...prev,
                projects: mergeRepos(cached.repos),
                loading: false,
                usingCache: true,
              }));
            }
            return;
          }
        }
      } catch {
        // corrupt cache entry, ignore and fetch fresh
      }

      try {
        const response = await fetch(githubApiEndpoint, {
          headers: { Accept: "application/vnd.github+json" },
        });

        if (!response.ok) {
          throw new Error(`GitHub API responded with status ${response.status}`);
        }

        const repos = (await response.json()) as GitHubRepo[];

        try {
          window.localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), repos }),
          );
        } catch {
          // storage unavailable (private mode / quota) — caching is optional,
          // so a failed write must not discard the successfully fetched data
        }

        if (isMounted) {
          setState({
            projects: mergeRepos(repos),
            loading: false,
            error: null,
            usingCache: false,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Unable to load GitHub projects right now.",
          }));
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
