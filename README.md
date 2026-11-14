# KarlDev Portfolio

My personal web portfolio — the games, websites, and mobile apps I've built, plus a
little about me.

**Live site:** <https://karlsondevlock.github.io/>

## Sections

- **Home** — hero video, featured projects carousel, about me, contact links
- **Games** — my game development projects
- **Website** — the websites I've built
- **Mobile** — the mobile apps I've built
- **About** — the tools I use and my skills

## Tech stack

React 19 · Vite 8 · Tailwind CSS v4 · React Router

## Run locally

```bash
cd react
npm install
npm run dev
```

Open <http://localhost:5173>.

Images and videos live in `assets/`. When you start or build the app,
`react/scripts/sync-assets.mjs` copies them into `react/public/assets`; the copy is
gitignored, so the media is stored once.

## Build

```bash
cd react
npm run build
```

The site is generated in `react/dist`.

## Deployment

`.github/workflows/deploy-pages.yml` builds the app and publishes it to GitHub
Pages on every push to `main`. Pages source: **GitHub Actions**.

## Project structure

```
assets/    images and videos used by the site
react/     React source for the website
.github/   GitHub Pages deployment workflow
```

## Contact

- GitHub: <https://github.com/KarlsonDevLock>
- itch.io: <https://karlsondevlock.itch.io/>
- YouTube: <https://www.youtube.com/@Devlock21>
