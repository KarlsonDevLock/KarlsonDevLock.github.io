# Portfolio Web App

The React source for my personal portfolio website: hero video, project carousel,
game/website/mobile project galleries, about section, and contact links.

## Run

```bash
cd react
npm install
npm run dev
```

Open <http://localhost:5173>.

`npm run dev` and `npm run build` first copy the media from `../assets` into
`public/assets` via `scripts/sync-assets.mjs`. Those copies are gitignored. Use
`npm run sync-assets` if you change an image or video while the dev server is
running.

## Build

```bash
npm run build
npm run preview
```

Output goes to `react/dist`. The Vite `base` is `./`, so the build also works from
a sub-folder.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/projects/games` | Game projects |
| `/projects/web` | Website projects |
| `/projects/mobile` | Mobile projects |

Routing uses `HashRouter`, so the URLs on GitHub Pages look like
`/#/projects/games`.

## Structure

```
src/
  App.jsx                 routes
  index.css               Tailwind v4 theme tokens + CSS animations
  data/projects.js        projects, tools, social links, gradients
  lib/asset.js            BASE_URL-aware asset paths
  components/
    Header.jsx            fixed header + Projects dropdown
    ProjectCarousel.jsx   3-slide carousel with per-slide gradient
    ProjectShowcase.jsx   media + description card
    ProfileFrame.jsx      photo/logo cross-fade
    Footer.jsx
  pages/
    Home.jsx              hero video, carousel, about
    ProjectsPage.jsx      games / website / mobile lists
public/assets             images and videos copied from ../assets (gitignored)
```

## Notes

- The media folder has no poster images (`project-*.svg`), so the project videos
  play without posters.
- Fonts are the system UI font, matching the rest of the site. No webfont is
  downloaded.
- Deployment is handled by `.github/workflows/deploy-pages.yml`.
