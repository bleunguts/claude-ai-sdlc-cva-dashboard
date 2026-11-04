# Module 2: Build — Replit Agent

Prompt log and retro. Inputs were `design/UI-stitch.jpg`, `design/mock-data.json` and `prompt.md` (see `replit-inputs.zip` in the repo root).

## Prompt log
| # | Prompt | Result | What changed and why |
|---|---|---|---|
| 1 | Starter prompt (`replit-inputs.zip` / `prompt.md`): single-page React + TS (Vite) CVA monitor, static JSON import, no backend/auth/routing, filters (search, bucket, date range), 26px rows, monospace right-aligned numerics, props-driven `CvaGrid`, null as "—". | Working one-page app. `CvaGrid` took `rows` as props, nulls rendered "—", data identical to `design/mock-data.json`. But the scaffold was a pnpm monorepo with an Express api-server, Postgres/Drizzle and OpenAPI packages, a mockup-sandbox and ~50 shadcn components, none used. | Baseline. The UI followed the prompt; the project template did not. "No backend" constrained the app, not the scaffold. |
| 2 | Follow-up (by hand, in Replit): switch to the dark theme shown in the dark Stitch screenshot (`UI-stitch-professional-dark-theme.jpg`). | Dark terminal theme (near-black background, teal/pink accents). | Tried the dark look. It contradicted the Module 1 decision (light variant is the build target), so it was reverted in #3. |
| 3 | Theme-only follow-up: match `UI-stitch.jpg` (light). Explicit palette (`#ffffff`, `#f3f4f6`, `#e5e7eb`, `#0b5fff`, red `#dc2626`), one monospace family, red for CDS spread > 150 bps and CVA charge > $4,000,000. "Do not change layout, features, data, filters, sorting or the `CvaGrid` props." | Light theme. Diff touched only `index.css`, `CvaGrid.tsx` (threshold class) and `App.tsx` (active-filter attribute). `CvaGrid` props unchanged. Typecheck and build pass. | Theme change only, no re-scaffold. |

## Retro
- **Why #3 worked:** it named exactly what to change (colours, font, highlight) with concrete values and exactly what not to touch (layout, features, data, `CvaGrid` props). The agent made a three-file diff. The same lesson as Module 1: asking for less produced a cleaner result.
- **Where #1 fell short:** the agent honoured every UI constraint but ignored "no backend" at the project level, because that is its default template. A prompt can constrain the app but not the scaffold; pruning the unused packages is a separate manual step.
- **Iteration #2 was a detour, not a failure:** the dark theme worked, but the decision on the target design had already been made in Module 1. Checking the prompt against the recorded decision first would have saved a round trip.
- **Local run:** the Replit workspace is Linux-only (pnpm, non-Linux native binaries excluded), but the app itself runs on Windows with plain npm from `artifacts/cva-monitor/`.
- **Left in place on purpose:** the unused scaffold, a hardcoded "Snapshot · 06 Oct 2026" label and a runtime Google Fonts import. Module 5 needs a rough edge, so these are not pre-fixed.

## AI Studio export vs Replit build
Not like-for-like: AI Studio was design-to-code (the full Stitch export), Replit was spec-to-code (a cut-down prompt). Compared on the same criteria. Screenshots: [AI Studio](../design/UI-aistudio.jpg), [Replit](../design/UI-replit.jpg). The AI Studio zip was read, not run.

| Criterion | AI Studio export | Replit build |
|---|---|---|
| Visual fidelity to `UI-stitch.jpg` | Very close: same chrome, chips with counts, Compact/Standard toggle, column picker | Same light, monospace feel but smaller type and no sidebar/top bar (cut by the prompt) |
| Scope adherence | Everything in the mockup: 4 extra views (Sensitivity, Limits, Monte Carlo, Stress), inspection drawer, notification/help modals, Recalculate, CSV export, pagination | Exactly the spec: title, 3 filters, sortable table, filtered total |
| Data fidelity | Own generated data (`generateAllCounterparties()`, 58 counterparties, `Math.random` jitter on recalculate), not `mock-data.json`; no null edge case | Pinned `mock-data.json` unchanged; null spread/CVA render "—" |
| Date range filter | None | Yes (from/to) |
| Testability (M3/M4) | Table is inline in a 907-line `App.tsx` with 14+ `useState` hooks; no separate grid component | `CvaGrid({ rows })` isolated and props-driven; `data-testid` attributes throughout |
| Footprint | Vite app, but also `@google/genai`, `express`, `dotenv` and a `GEMINI_API_KEY` env example that the UI does not need | Unused monorepo scaffold (api-server, Postgres/Drizzle, OpenAPI, shadcn kit) |
| Effort | One prompt, no follow-ups: "Build me an app with screens that look like this. You can hotlink images from the HTML", with the Stitch HTML export attached; fastest to pixels | 3 prompts; one was a wrong turn (dark theme) |

**Takeaway:** use the design-export tool when you want pixels fast; use the agent when you want a controlled structure and the dataset you chose. Neither removed the cleanup: AI Studio's is deleting scope, Replit's is deleting scaffold.
