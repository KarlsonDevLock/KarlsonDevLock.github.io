# Portfolio → React (porting notes)

The original static site (`index.html`, `projects-*.html`, `style.css`,
`script.js`) was removed once the React port was verified; it remains in git
history. `react/` is the website, and `assets/` is the shared media folder that
`react/scripts/sync-assets.mjs` copies into `react/public/assets` before every
start/build.

## Run

```bash
cd react
npm install
npm run dev
```

## What maps to what

| Original | React port |
| --- | --- |
| 4 static HTML pages | React Router (`HashRouter`): `/`, `/projects/games`, `/projects/web`, `/projects/mobile` |
| `style.css` | Tailwind v4 `@theme` tokens + utilities |
| `script.js` dropdown | React state + outside-click + `Escape` |
| radio-input carousel | `useState` index + CSS transform, same 520 ms cubic-bezier |
| per-slide section gradient | inline gradient from data, `transition: background 420 ms` |
| `<video autoplay muted loop playsinline>` | native `<video>` with the same attributes |
| `backdrop-filter: blur()` | `backdrop-blur-*` utilities |
| CSS keyframe photo/logo cross-fade | unchanged CSS keyframes |
| `position: fixed` header and `#home` / `#about` anchors | same fixed header; `scrollIntoView` and router state for cross-page links |
| relative `assets/...` paths | `BASE_URL`-aware asset helper, files copied into `public/assets` |
| 900 px / 640 px media queries, `clamp()` type scale | same values via Tailwind arbitrary variants and `clamp()` |

## Things worth knowing

- The old HTML referenced capitalised tool logos (`BlenderLogo.png`,
  `VscodeLogo.png`, `Vscode2022Logo.png`). The files are lowercased now so they
  load on Linux/GitHub Pages, where paths are case-sensitive.
- Videos total ~85 MB and are copied into `public/assets` at build time. The copy
  is gitignored; the single source is the repo-root `assets/` folder.
- Posters referenced by the old HTML (`assets/images/projects/*.svg`) do not exist
  in the repo, so no posters are used.
- The original CSS declares `Inter` but never loads it, so the site uses the
  system UI font — identical to what the static site displayed.
- Deployment: `.github/workflows/deploy-pages.yml` builds `react/` and publishes
  `react/dist` to GitHub Pages (`/#/projects/games`, `/#/projects/web`,
  `/#/projects/mobile`).
