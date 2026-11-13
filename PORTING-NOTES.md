# Portfolio → React Native (porting notes)

The original static site (`index.html`, `projects-*.html`, `style.css`,
`script.js`) has been **removed** from the repo root now that both ports were
verified; it remains in git history. The shared `assets/` folder was kept because
both projects read from it (see `scripts/sync-assets.mjs`). Two projects now
live here:

| Folder | Stack | Purpose |
| --- | --- | --- |
| `react/` | Vite 8 + React 19 + Tailwind CSS v4 | the website rebuilt as a React web app |
| `mobile/` | Expo SDK 58 + React Native 0.88 + Expo Router | the same UI rebuilt as a native mobile app |

Nothing was rewritten by hand-waving: the CSS was translated token by token
(colors, radii, spacing, `clamp()` type scale, the 900 px / 640 px breakpoints,
the two profile keyframes, the carousel timing curve) and every asset is the
original file.

## Run

```bash
# web (React + Tailwind)
cd react
npm install
npm run dev

# native (Expo / React Native)
cd mobile
npm install
npx expo start      # scan the QR with Expo Go, or press a / i / w
```

## What maps to what

| Original | React web port | React Native app |
| --- | --- | --- |
| 4 static HTML pages | React Router (`HashRouter`) | Expo Router stack (4 routes) |
| `style.css` | Tailwind v4 `@theme` tokens + utilities | `StyleSheet` + `src/theme.js` |
| `script.js` dropdown | React state + outside-click/Escape | `Modal` popover + BackHandler |
| radio-input carousel | `useState` + CSS transform | `useState` + `Animated.timing` |
| hero video | `<video autoPlay muted loop>` | `expo-video` `useVideoPlayer` |
| CSS gradients | CSS gradients | `expo-linear-gradient` |
| `backdrop-filter` | Tailwind `backdrop-blur` | `expo-blur` |
| profile cross-fade keyframes | CSS keyframes | `Animated.loop` |
| fixed header | `position: fixed` | absolute header + safe-area insets |

## Things worth knowing

- The videos total ~85 MB. That is fine for Expo Go and a course demo, but the
  Play Store caps new apps at 100 MB — compress them before an EAS build.
- Posters referenced by the original HTML (`assets/images/projects/*.svg`) do
  not exist in the repo; they were omitted rather than faked.
- `mobile/scripts/sync-assets.mjs` copies `assets/` → `mobile/assets/portfolio`
  and renames the one `.PNG` file to `.png` (Metro is case-sensitive about
  extensions). `react/scripts/sync-assets.mjs` copies `assets/` → `public/assets`.
  Both copies are gitignored and run automatically before start/build.
- Store identifiers (`ios.bundleIdentifier`, `android.package`) are not set yet.
  Add them in `mobile/app.json` before publishing.
