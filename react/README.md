# KarlDev Portfolio — React + Vite + Tailwind

A 1:1 React port of the original static portfolio (`index.html`, `projects-*.html`,
`style.css`). The old HTML/CSS files were removed from the repo root once this port
was verified; they are still available in git history.

## Run

```bash
cd react
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173).

`npm run dev` / `npm run build` first run `scripts/sync-assets.mjs`, which copies
the repo-root `assets/` into `public/assets` (gitignored, so the 85 MB of media
is not stored twice). Run `npm run sync-assets` manually if you update assets.

## Build

```bash
npm run build
npm run preview
```

The build output is `react/dist`. `base` is `./`, so it also works from a
GitHub Pages sub-folder (for example `https://user.github.io/repo/react/`).

## Structure

```
src/
  App.jsx                 routes (HashRouter, GitHub Pages friendly)
  index.css               Tailwind v4 theme tokens + the two CSS animations
  data/projects.js        every project, tool, social link and gradient
  lib/asset.js            BASE_URL-aware asset paths
  components/
    Header.jsx            fixed header, Projects dropdown (click / outside click / Escape)
    ProjectCarousel.jsx   the 3-slide carousel, gradient changes per slide
    ProjectShowcase.jsx   media + description card (alternating on project pages)
    ProfileFrame.jsx      circular photo <-> logo cross-fade
    Footer.jsx
  pages/
    Home.jsx              hero video, carousel, about
    ProjectsPage.jsx      Games / Website / Mobile lists
public/assets             original images and videos, copied unchanged
```

## Notes

- Routes are `/#/`, `/#/projects/games`, `/#/projects/web`, `/#/projects/mobile`.
- The original site referenced `assets/images/projects/project-0X.svg` posters that do not
  exist in the repo, so the posters were dropped (the videos themselves are unchanged).
- The old static files have been removed from the repo root; this app lives entirely in
  `/react`, and `.github/workflows/deploy-pages.yml` publishes it to GitHub Pages.
