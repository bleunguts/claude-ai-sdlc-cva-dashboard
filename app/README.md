# CVA Dashboard — app

React + TypeScript (Vite) CVA-by-counterparty monitor, built by Replit Agent in Module 2 from `design/UI-stitch.jpg` and `design/mock-data.json`. Prompt log and retro: [PROMPTS.md](PROMPTS.md).

## Run locally

The runnable app is `artifacts/cva-monitor/`. Use npm there (Windows, Node 22.12+):

```bash
cd app/artifacts/cva-monitor
npm install
npm run dev:windows   # http://localhost:5173
npm run build         # production build
npm run typecheck
```

See [artifacts/cva-monitor/README.md](artifacts/cva-monitor/README.md) for details.

## Layout

- `artifacts/cva-monitor/` — the app. `src/CvaGrid.tsx` is the props-driven table (`rows: CvaRow[]`); `src/App.tsx` holds filter state; `src/data/mock-data.json` is the static dataset.
- Everything else is Replit scaffold, kept as generated: `artifacts/api-server`, `artifacts/mockup-sandbox`, `lib/*` (Postgres/Drizzle, OpenAPI), `attached_assets/`. None of it is used by the app. The root `pnpm` workspace is tuned for Replit's Linux container (non-Linux native binaries are excluded), so on Windows run npm inside `artifacts/cva-monitor/` instead.
