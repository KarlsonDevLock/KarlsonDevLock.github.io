# KarlDev Portfolio

My portfolio as a React web app — rebuilt from the original static HTML/CSS site.
Same design, same images and videos, only the code environment changed.

| Folder | What it is | Stack |
| --- | --- | --- |
| `react/` | the portfolio website | Vite 8 · React 19 · Tailwind CSS v4 · React Router |
| `assets/` | the original images and videos used by the app | — |

The old static site (`index.html`, `projects-*.html`, `style.css`, `script.js`) was
removed after the React port was verified. It is still in git history if you ever
need it:

```bash
git log --oneline -- index.html      # find the commit
git show <commit>:index.html > index.html
```

## Run

```bash
cd react
npm install
npm run dev        # http://localhost:5173
```

Before `dev`/`build`, `react/scripts/sync-assets.mjs` copies `assets/` into
`react/public/assets`. That copy is gitignored, so the ~85 MB of media is stored
once, in `assets/`.

## Live

<https://karlsondevlock.github.io/>

Deployed by `.github/workflows/deploy-pages.yml`, which builds `react/` and
publishes `react/dist` to GitHub Pages (Pages source: **GitHub Actions**).

Routes (HashRouter):

- `/#/` — Home
- `/#/projects/games` — Game projects
- `/#/projects/web` — Website projects
- `/#/projects/mobile` — Mobile projects (a project category, not a mobile app)

## Notes

- The HTML → React mapping is documented in [`PORTING-NOTES.md`](./PORTING-NOTES.md).
- Posters referenced by the original HTML (`assets/images/projects/*.svg`) do not
  exist in the repo, so they were omitted rather than faked.
- The original CSS declares `Inter` but never loaded an Inter webfont, so the site
  uses the system font — that is what visitors actually saw.
- Media is ~85 MB. It is copied into the build output, so keep an eye on the
  GitHub Pages size limits if you add more videos.
