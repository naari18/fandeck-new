# Asian Paints Digital Fandeck

An interactive digital fandeck built with React + Vite. Browse 2200+ Asian Paints shades, pick your favourites, and use **Family Decision Mode** to let everyone in the family vote on the perfect colour.

---

## Features

### Browse & Discover
- **Interactive fan** — 13 strips per page, spread across 120°, animated open/close when switching colour families
- **2200+ shades** from `apcatalogue.json` organised by physical fandeck order
- **Family filter bar** — top 7 families + "More ▾" dropdown for the rest
- **Secondary filters** — filter by tonality (Light / Medium / Dark) and temperature (Warm / Cool)
- **Search** — find any shade by name or code instantly
- **Shade detail drawer** — tap any strip to slide up a detail sheet with name, code, hex, tags, and a direct link to asianpaints.com
- **Hover tooltip** — floating pill shows name and code as you move over strips

### Shortlist
- Add up to **4 shades** to a shortlist via the detail drawer
- Bottom tray shows shortlisted chips with remove buttons
- Contextual nudge tells you how many more you need for Family Decision

### Family Decision Mode
- **Intro screen** — explains the process before starting
- **King-of-the-Hill voting** — pairs are shown head-to-head; voting eliminates the loser each round
- **Progress indicator** — round dots show how far through the bracket you are
- **Winner reveal** — confetti animation, shade name + code, and two actions:
  - 🎨 View on Asian Paints website
  - 📤 Download a 1080×1080 share card (Canvas-based PNG)

### Discoverability
- **Feature card** — floating card on first visit explains Family Decision in 3 steps; dismisses to a compact pill
- Pill shows "Vote now!" when ≥ 2 shades are in the shortlist

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI + state |
| Vite | 5 | Dev server + bundler |
| CSS (vanilla) | — | All styles in `src/styles.css` |
| HTML Canvas | — | Share card image generation |

No external UI libraries. No backend.

---

## Project Structure

```
fandeck-new/
├── apcatalogue.json          # 2200+ AP shade data (source of truth)
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx               # Root: view routing + shared shortlist/decision state
    ├── styles.css            # All styles (tokens, components, responsive)
    ├── main.jsx              # React entry point
    │
    ├── utils/
    │   ├── constants.js      # ALL_SHADES, FAMILY_STATS, CONFETTI, MAX_SHORTLIST, FAN_SIZE
    │   └── shareCard.js      # Canvas-based PNG share card generator
    │
    ├── views/
    │   └── BrowseView.jsx    # Browse screen: filter/fan/tray state + layout
    │
    └── components/
        ├── browse/
        │   ├── Header.jsx          # Logo + search bar
        │   ├── FamilyTabs.jsx      # Colour family filter chips + More dropdown
        │   ├── SecondaryFilters.jsx # Tonality + temperature chips + shade count
        │   ├── FanStage.jsx        # Fan pivot, strips, nav arrows, tooltip, page dots
        │   ├── BottomTray.jsx      # Shortlist chips + Compare/Family Decision buttons
        │   ├── ShadeDetailDrawer.jsx # Bottom sheet: swatch, meta, tags, add/view actions
        │   └── FeatureCard.jsx     # Discovery card / collapsed pill (bottom-right)
        │
        └── decision/
            ├── IntroModal.jsx  # "Choose together" splash screen
            ├── RoundView.jsx   # Head-to-head voting: VS layout + prefer buttons
            └── WinnerView.jsx  # Winner reveal: confetti, share card download
```

---

## Data Shape (`apcatalogue.json`)

Each shade object has:

```json
{
  "entityCode": "8060",
  "entityName": "Day Lily",
  "shadeFamily": "off whites",
  "shadeHexCode": "#F7EBE5",
  "pageUrl": "https://www.asianpaints.com/...",
  "featureTag": "Recommended",
  "pageNumber": "5",
  "positionNumber": "3",
  "filterTitle": {
    "color temperature": ["cool"],
    "tonality": ["light"],
    "room": ["all rooms"]
  },
  "popularity": 92,
  "latest": false
}
```

`FAMILY_STATS` is derived at build-time from this data, sorted by `minPage` to preserve the physical fandeck ordering (Off Whites first).

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3002
npm run build      # production build → dist/
npm run preview    # preview the production build
```

---

## Key Design Decisions

- **Fan geometry** — strips are `position: absolute` within a zero-size pivot div, rotated with `transform-origin: bottom center`. `transform: rotate(Xdeg)` where X is calculated to spread evenly across `SPREAD` degrees.
- **No colour distortion on hover** — hover uses border + shadow only (no `filter: brightness()`).
- **Fan animation** — `spreadMult` state (1 → 0 → 1) collapses and reopens the fan when switching families.
- **Tournament algorithm** — King-of-the-Hill: candidates array shrinks by one each round; last shade standing wins.
- **Share card** — drawn entirely on an `<canvas>` element (no server, no third-party service), exported as a data URL and triggered as a download.
- **Responsive fan height** — uses `min(Xpx, calc(100svh - Ypx))` so the fan never overflows its container on short screens.
