# Recharts Squirrels (Ionic + Recharts)

An **Ionic React** app that charts the **2018 Central Park Squirrel Census** with
**Recharts**. It shows a few different chart types on real data:

- **Bar chart**: what the squirrels were doing (foraging, eating, running, ...)
- **Pie chart**: the fur-color breakdown (mostly gray)
- **Scatter chart**: sighting locations (`x`/`y`), which trace out Central Park,
  with a separate series per fur color

Every chart is **interactive**: hover for a tooltip, and each one resizes with its
`IonCard` (via Recharts' `ResponsiveContainer`).

**Filters** at the top drive all four charts:

- **Fur color** (multi-select): pick which fur colors to include
- **Date** (dual-knob range): limit to a range of days in October 2018

Change a filter and every chart recomputes from the same filtered set.

## Stack

- **Ionic + React + Capacitor** (the blank Ionic starter)
- **Recharts** for the charts
- **Vite** for the dev server and build

## Data

`src/data/squirrels.ts` holds one record per squirrel sighting (location, fur color,
day, and activity flags); the charts aggregate and filter it in the app. The dataset
is the **2018 Central Park Squirrel Census** from
[NYC Open Data](https://data.cityofnewyork.us/Environment/2018-Central-Park-Squirrel-Census-Squirrel-Data/vfnx-vebw)
(dataset `vfnx-vebw`); the raw CSV also lives in `../eda-squirrel/`.

## Run

```bash
yarn install
yarn dev          # then open the printed localhost URL
```

Or with the Ionic CLI: `ionic serve`.

## Where to look

- **`src/pages/Home.tsx`** — the filter panel and the three charts, each in an
  `IonCard`, built from Recharts components (`<BarChart>`, `<PieChart>`,
  `<ScatterChart>`); filtering and aggregation happen in `useMemo`
- **`src/data/squirrels.ts`** — the per-sighting records
