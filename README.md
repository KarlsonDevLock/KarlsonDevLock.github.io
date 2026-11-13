# KarlDev Portfolio

Portfolio for game, web, and mobile development — rebuilt from the original static
HTML/CSS site into two projects that share the same design and assets.

| Folder | What it is | Stack |
| --- | --- | --- |
| `react/` | the portfolio as a React web app | Vite 8 · React 19 · Tailwind CSS v4 · React Router |
| `mobile/` | the portfolio as a native mobile app | Expo SDK 58 · React Native 0.88 · Expo Router |
| `assets/` | the original images and videos, shared by both projects | — |

The old static site (`index.html`, `projects-*.html`, `style.css`, `script.js`) has
been removed now that both ports are verified. It is still in git history if you
ever need it:

```bash
git log --oneline -- index.html      # find the commit
git show <commit>:index.html > index.html
```

## Run

```bash
# web
cd react
npm install
npm run dev        # http://localhost:5173

# native
cd mobile
npm install
npx expo start     # Expo Go QR code, or press a / i / w
```

Both projects copy `assets/` into themselves automatically before starting or
building (`scripts/sync-assets.mjs`). The copies are gitignored, so the ~85 MB of
media is stored once.

## Deploy (GitHub Pages)

`.github/workflows/deploy-pages.yml` builds `react/` and publishes `react/dist`.

One-time setup in the repository:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Push to `main` (or run the workflow manually).

The site then serves at <https://karlsondevlock.github.io/> with the React app
(HashRouter routes: `/#/projects/games`, `/#/projects/web`, `/#/projects/mobile`).

> Set the Pages source **before** pushing the removal commit, otherwise the old
> branch deployment has nothing to serve until the workflow runs.

## Notes

- Full conversion details and the HTML → React → React Native mapping are in
  [`PORTING-NOTES.md`](./PORTING-NOTES.md).
- Known platform differences (radial gradient approximation, Android blur
  fallback, 85 MB of video, missing store IDs) are listed in
  [`mobile/README.md`](./mobile/README.md).
- The repo declares `Inter` in the original CSS but never loaded it, so both
  projects intentionally use the system font — that is what visitors saw.
