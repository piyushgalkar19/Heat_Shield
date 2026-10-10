# HeatShield v9

v9.1: bug fixes (see CHANGES.md). Every district now loads from `public/districts.json`, which ships with the project (783 districts).

New in v8: heat duration (next 72 h) adds up to 10 points to the risk score; zone detail shows where to act first; Priority zones can sort by points saved per cost unit. Intervention effects and costs in `src/data.js` (`INTERV`) are illustrative, so replace them with local evidence.

# India-wide monitor (v7)

New: `/india` (national monitor), `/state/<state>` (district ranking), CSV export, 30-minute live refresh, "newly Extreme" alerts.

## Cover every district
1. Download an India district GeoJSON (for example datta07/INDIAN-SHAPEFILES or guneetnarula/indian-district-boundaries).
2. `node scripts/build-districts.mjs path/to/districts.geojson` writes `public/districts.json` (about 30 KB: state, district, lng, lat).
3. `npm install && npm run dev`. Without that file the monitor shows the 38 state and UT capitals.

Opening any district loads its real neighbourhoods from OpenStreetMap, as the original cities do.

## Limits
- District score uses live weather only (temperature, wet-bulb, ground heat). Exposure, urban form and air are held at 50 until district data is added.
- "Real time" means polling Open-Meteo every 30 minutes while a tab is open (about 780 points per refresh; batches are spaced out and cached for 30 minutes to stay inside the free limits). For many users, move this to a server with a cache and a commercial or IMD feed.
- District hexagons sit on boundary-box centres and are not the real borders.

## Deploy
Vercel: import the repo, framework Vite, build `npm run build`, output `dist`. `vercel.json` (and `public/_redirects` for Netlify) send every path to `index.html` so links like `/map/mumbai` work after a reload.
