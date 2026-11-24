# Ridwaan Apdirahman Mohamed — Portfolio

A production-ready personal portfolio built with React, TypeScript, Vite and Tailwind CSS. It presents Ridwaan Apdirahman Mohamed as a Software Engineer and Full-Stack Developer — business management systems, web applications, AI integration and database design — with a curated, verified project catalogue.

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

- [Node.js](https://nodejs.org/) 20.19+ (20.x) or 22.12+
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
| `npm run generate:brand` | Regenerate `public/favicon.svg`, `public/apple-touch-icon.png` and `public/og-image.jpg` |
| `npm run generate:covers` | Regenerate the project cover images using `scripts/generate-project-covers.mjs` |

## Project structure

```
src/
  components/       UI sections and shared components
  data/             Editable content: personalInfo, skills, projects, services, journey
  components/projects/  Featured projects, filterable gallery and the project details dialog
  hooks/            useTheme, useActiveSection
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

- **`personalInfo.ts`** — name, title, focus areas, bio, contact links and availability text.
- **`skills.ts`** — skill groups (only skills used in a listed project).
- **`services.ts`** — the "What I build" cards.
- **`journey.ts`** — the experience & development timeline (dates from repository history) and education.
- **`projects.ts`** — the curated project catalogue, categories and derived stats.

Edit these files and the site updates automatically — no other code changes needed for content edits.

## Project catalogue rules

`src/data/projects.ts` is the single source of truth for projects. Each entry has a category list (used by the filters), a status (`Live`, `In development`, `Completed`), features, technologies and optional links:

- `liveUrl` — only for deployments that were opened and verified to work.
- `repoUrl` — only for **public** GitHub repositories. Private repos get no Source button; `tests/project-data.test.mjs` enforces this.
- `links` — several live sites grouped into one collection card.
- `image` — a real screenshot in `public/projects/` (1200×750 WebP). The tests check that every referenced image exists.

The hero and GitHub-activity numbers are computed from this file. The public repository count is fetched live from the GitHub API (cached for an hour, with a graceful fallback).

## Updating the profile images

The portfolio uses two profile-image outputs for different purposes:

- `src/assets/images/profile-cutout.png` is the background-removed image shown in the Hero section. It is generated from `src/assets/images/avatar-original.png` by `scripts/remove-avatar-background.mjs`.
- `public/profile.png` is the public portrait used by Open Graph and Twitter previews, structured data, and `personalInfo.avatarUrl`.

To keep both versions in sync when changing the photo:

1. Replace `src/assets/images/avatar-original.png` with the new source photo.
2. Regenerate the Hero cutout:
   ```bash
   npm run process:avatar
   ```
3. Check the regenerated `profile-cutout.png`. If the edges retain background color, adjust `INNER_THRESHOLD` / `OUTER_THRESHOLD` at the top of the script and run the command again.
4. Replace `public/profile.png` with the public portrait, keeping the filename unchanged so the existing metadata URLs remain valid.
5. Run `npm run build`, then verify the Hero image and the deployed `/profile.png` URL.

## Replacing project images

1. Capture a 1440×900 screenshot of the live site.
2. Convert it to a 1200×750 WebP in `public/projects/` (for example with `sharp`).
3. Point the project's `image` field at it. Missing images fall back to a typographic cover automatically.

## Updating the CV

The CV linked from every "Download CV" button is generated by `scripts/generate-resume.mjs` into `public/resume/Ridwaan-Apdirahman-Mohamed-CV.pdf`.

To update it:

1. Edit the content inside `scripts/generate-resume.mjs`.
2. Regenerate the PDF:
   ```bash
   npm run generate:resume
   ```
3. Commit the updated PDF in `public/resume/`.


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

## SEO and Google Search Console

Production SEO endpoints:

- Canonical website: https://ridwaan-portfolio.vercel.app/
- Sitemap: https://ridwaan-portfolio.vercel.app/sitemap.xml
- Robots file: https://ridwaan-portfolio.vercel.app/robots.txt

To add the portfolio to Google Search Console:

1. Add the URL-prefix property `https://ridwaan-portfolio.vercel.app/` in [Google Search Console](https://search.google.com/search-console).
2. Choose HTML tag verification and copy the verification token.
3. Add `<meta name="google-site-verification" content="YOUR_TOKEN" />` inside the `<head>` of `index.html`, deploy, then select **Verify**.
4. Open **Sitemaps** and submit `sitemap.xml`.
5. Inspect the homepage in **URL Inspection** and select **Request Indexing** after the verified deployment is live.

Google controls crawling, indexing and rankings, so no ranking position is guaranteed.
