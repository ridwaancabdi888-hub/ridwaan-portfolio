# Ridwaan Apdirahman Mohamed — Portfolio

A production-ready personal portfolio built with React, TypeScript, Vite and Tailwind CSS. It presents Ridwaan Apdirahman Mohamed as a Full-Stack Web Developer, System Developer and Prompt Engineer, and pulls project data live from GitHub.

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** for animation
- **Lucide React** for icons
- **PDFKit** (build-time only) to generate the downloadable CV

## Live demo

Visit the deployed portfolio: **[ridwaan-portfolio.vercel.app](https://ridwaan-portfolio.vercel.app/)**

## Local setup

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- npm (included with Node.js)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ridwaancabdi888-hub/ridwaan-portfolio.git
   ```
2. Move into the project directory:
   ```bash
   cd ridwaan-portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL printed in the terminal (typically [http://localhost:5173](http://localhost:5173)).

Environment variables are optional. The site works without them by using the contact form's `mailto:` fallback. To enable Formspree or CallMeBot, copy `.env.example` to `.env`, add the relevant values described in the [Contact form](#contact-form) section, and restart the development server.

To verify a production build locally:

```bash
npm run build
npm run preview
```

## Available scripts

| Script                 | What it does                                              |
| ----------------------- | ---------------------------------------------------------- |
| `npm run dev`           | Start the Vite dev server with hot reload                  |
| `npm run build`         | Type-check with `tsc -b`, then produce a production build in `dist/` |
| `npm run preview`       | Preview the production build locally                       |
| `npm run lint`          | Run Oxlint                                                  |
| `npm run generate:resume` | Regenerate `public/resume/Ridwaan-Apdirahman-Mohamed-CV.pdf` from `scripts/generate-resume.mjs` |
| `npm run process:avatar` | Regenerate the background-removed profile image from `src/assets/images/avatar-original.png` |
| `npm run generate:covers` | Regenerate the project cover images using `scripts/generate-project-covers.mjs` |

## Project structure

```
src/
  components/       UI sections and shared components
  data/             Editable content: personalInfo, skills, projects, services, education
  hooks/            useGitHubProjects, useTheme, useActiveSection
  assets/           Hero profile photo (source + background-removed cutout)
  App.tsx           Composes every section
  main.tsx          React entry point
  index.css         Tailwind import, design tokens (colors, fonts), base styles

public/
  favicon.svg       RM-initials favicon
  robots.txt
  sitemap.xml
  resume/           Generated PDF CV lives here
  project-images/   Real project screenshots go here (see below)

scripts/
  generate-resume.mjs   Node script that builds the PDF CV with PDFKit
```

## Updating personal information

Almost everything text-based lives in `src/data/`:

- **`personalInfo.ts`** — name, titles, bio, contact links, availability text, stats.
- **`skills.ts`** — skill categories and the items inside each.
- **`services.ts`** — the "What I Do" cards.
- **`education.ts`** — education timeline entries and the "Practical Experience" groups.
- **`projects.ts`** — the 3 hand-curated featured projects, plus `watchedRepoNames` (extra repos to look for on GitHub) and the GitHub API endpoint.

Edit these files and the site updates automatically — no other code changes needed for content edits.

## How the GitHub projects integration works

`src/hooks/useGitHubProjects.ts` fetches:

```
https://api.github.com/users/ridwaancabdi888-hub/repos?sort=updated&per_page=100
```

- No token is required (public data only).
- Results are cached in `localStorage` for 30 minutes to avoid refetching on every visit.
- The 3 featured projects in `projects.ts` are matched against live repo data by name, so they always show real stars / last-updated / language, merged with the hand-written description and tech list.
- Any other repo in `watchedRepoNames` is shown using the raw GitHub data.
- A repo is only treated as a real project if it has a description or a non-trivial size — otherwise it's placed under the "Work in Progress" filter instead of being invented as a finished project.
- If the GitHub API is unreachable, the section falls back to the local project data in `projects.ts` and shows an inline notice — it never shows a blank section or fake data.

## Updating the hero photo

The Hero section shows a background-removed cutout (`src/assets/images/profile-cutout.png`) with a neon-green glow, generated from `src/assets/images/avatar-original.png` by `scripts/remove-avatar-background.mjs`. It works by chroma-keying a solid-color backdrop, so it works best with a photo shot against a flat, even background (a passport/ID-style photo, for example).

To swap in a new photo:

1. Replace `src/assets/images/avatar-original.png` with the new photo.
2. Run:
   ```bash
   npm run process:avatar
   ```
3. Check the regenerated `profile-cutout.png` — if the edges pick up background color, adjust `INNER_THRESHOLD` / `OUTER_THRESHOLD` at the top of the script and re-run.

## Replacing project images

No project screenshots have been confirmed yet, so `ProjectCard` renders a generated abstract thumbnail (clearly labeled "Generated thumbnail — no screenshot yet") for every project.

To add a real screenshot:

1. Save the image at the exact path referenced in `src/data/projects.ts`, e.g.:
   - `public/project-images/hargeisa-tax-system.webp`
   - `public/project-images/hostel-management.webp`
   - `public/project-images/epharmacy.webp`
2. That's it — `ProjectCard` tries to load `project.image` first and only falls back to the generated thumbnail if the file is missing, so real screenshots are picked up automatically.

## Updating the CV

The CV shown in the **Resume** section and linked from every "Download CV" button is generated by `scripts/generate-resume.mjs` into `public/resume/Ridwaan-Apdirahman-Mohamed-CV.pdf`.

To update it:

1. Edit the content inside `scripts/generate-resume.mjs` (and/or `src/components/Resume.tsx` for the on-page version — keep both in sync).
2. Regenerate the PDF:
   ```bash
   npm run generate:resume
   ```
3. Commit the updated PDF in `public/resume/`.

The on-page Resume section also has a **Print CV** button that opens the browser print dialog with only the CV content visible (everything else is hidden via print styles).

## Contact form

The Contact form validates all fields client-side (name, email, subject, message required; phone/WhatsApp number optional). By default (no backend configured) it opens the visitor's email client via a `mailto:` link pre-filled with their message — this avoids showing a fake "message sent" confirmation when there is no backend.

To connect a real backend:

1. Create a form at [Formspree](https://formspree.io) (or any compatible JSON endpoint).
2. Copy `.env.example` to `.env` and set:
   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxx
   ```
3. Restart the dev server. The form will now `POST` there and show a real success/error state instead of using `mailto:`.

### WhatsApp notifications

Every submission (via Formspree or the `mailto:` fallback) can also fire a best-effort WhatsApp notification through [CallMeBot](https://www.callmebot.com) — a free "notify me" webhook (not a general-purpose WhatsApp API).

1. Add `+34 644 91 07 79` as a WhatsApp contact and message it exactly: `I allow callmebot to send me messages`.
2. It replies with an `APIKey`. If nothing arrives within ~2 minutes, CallMeBot's own guidance is to wait 24h before trying again rather than resending immediately.
3. In `.env`, set `VITE_CALLMEBOT_PHONE` and `VITE_CALLMEBOT_APIKEY`. The activation reply includes a ready-to-use example URL — copy the exact `phone=` value from it rather than assuming a format, since CallMeBot has been inconsistent about whether it expects a leading `+` (e.g. `VITE_CALLMEBOT_PHONE=252634199277`, no `+`).

Because this is a static site with no backend, these values are visible in browser dev tools — that's inherent to CallMeBot's design (it only ever notifies your own number), but treat the API key as something to rotate if it's ever abused, not as a real secret.

## Deployment

### Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. (Optional) Add `VITE_FORMSPREE_ENDPOINT`, `VITE_CALLMEBOT_PHONE` and `VITE_CALLMEBOT_APIKEY` under Project Settings → Environment Variables.
5. Deploy. Update `og:url`, `canonical`, and `sitemap.xml` in `index.html` / `public/sitemap.xml` with the real Vercel URL afterwards.

Or from the CLI:

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

1. Install the Pages helper:
   ```bash
   npm install -D gh-pages
   ```
2. In `vite.config.ts`, set `base: "/<your-repo-name>/"`.
3. Add to `package.json` scripts: `"deploy": "npm run build && gh-pages -d dist"`.
4. Run:
   ```bash
   npm run deploy
   ```
5. In the GitHub repo settings, set Pages source to the `gh-pages` branch.
6. Update `index.html` (`canonical`, Open Graph `og:url`) and `public/sitemap.xml` / `public/robots.txt` with the final `https://<username>.github.io/<repo-name>/` URL.

## Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip-to-content link, visible focus rings, `aria-current`/`aria-pressed`/`aria-expanded` where relevant.
- Respects `prefers-reduced-motion` (disables the rotating hero title and shortens all transitions).
- Dark/light theme is stored in `localStorage` and falls back to the OS preference on first visit.
- GitHub project data is cached client-side to avoid redundant API calls; loading states use skeleton cards instead of a blank screen.
