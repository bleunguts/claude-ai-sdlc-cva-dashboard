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

---

# Module 3: Component testing — Storybook

Hand-driven tutorial module: the stories were written by hand, with Claude Code as reviewer. Issue #13. Output: `CvaGrid.stories.tsx` plus screenshots [empty](../design/storybook-empty.jpg), [populated](../design/storybook-populated.jpg), [error](../design/storybook-error.jpg).

## Iteration log
| # | Step | Result | What changed and why |
|---|---|---|---|
| 1 | `npx storybook@latest init` | Working `.storybook/`, but it also added the Vitest addon, Playwright browser provider, Chromatic and MCP addons, `latest`-pinned deps, and rewrote the whole of `vite.config.ts` (formatting plus a `test` block). | Scope creep from the generator. Reverted `vite.config.ts` and uninstalled the extras; only `storybook` and `@storybook/react-vite` remain. Playwright belongs to Module 4. |
| 2 | First stories draft | `Meta` used as a bare type expression; imported from `@storybook/react`. | Fixed to a typed `meta` default export and `@storybook/react-vite` (the package actually installed; `@storybook/react` only resolved transitively). |
| 3 | Populated story | Passed the 20-row `mock-data.json` cast to `CvaRow[]`. | Uses the same data as the app, so the null Trafigura row and stale timestamps are exercised. |
| 4 | Error story | First draft had the decorator inverted (`<Story>` wrapping `ErrorBoundary`) and a `...` placeholder. Fixed to `<ErrorBoundary><Story /></ErrorBoundary>` with `rows: null`. | The fallback now renders ("rows is not iterable"). |

## Retro
- **Error state without changing the component:** `CvaGrid` is presentational and has no error prop. Wrapping it in the existing `ErrorBoundary` and feeding it rows that crash `[...rows]` tests real behaviour and keeps the component untouched. Adding an `error` prop would have grown the component for the sake of a story.
- **Generators over-deliver:** `storybook init` installs a test stack by default. Reviewing the diff, not just checking that it runs, caught it. The same lesson as Module 2: the tool's defaults are not the scope.
- **A green build is not a rendered story:** typecheck and `build-storybook` passed with a wrongly nested decorator in play; only opening the story shows the fallback. Screenshots are the evidence.
- **Known rough edge:** the default fallback uses `min-h-screen`, so the error story is taller than the grid it replaces. Left as is.

---

# Module 4: E2E testing — Playwright

Hand-driven tutorial module: the test was typed step by step by hand, with Claude Code coaching and reviewing. Issue #15. Output: `artifacts/cva-monitor/e2e/cva-filter.spec.ts`.

## Iteration log
| # | Step | Result | What changed and why |
|---|---|---|---|
| 1 | Config + first assertion | `playwright.config.ts` with `webServer` (`npm run dev:windows`, port 5173); `20 of 20` asserted. Passed. | Initially scaffolded at the repo root; moved into `artifacts/cva-monitor` so the dependency sits with the app, not a stray root `package.json`. |
| 2 | Filter on `group`, expect `3 of 20` | **Failed:** received `4 of 20`. | My hand count missed Citigroup ("Citigroup" contains "group"). The test was right and the expectation was wrong; changed to `4 of 20`. |
| 3 | Assert 4 rows present, BNP Paribas absent (`toHaveCount(0)`) | Passed. | Checking only the present rows would pass if the filter did nothing; the absence check closes that. |
| 4 | Negative check: forced `matchesCounterparty = true` in `App.tsx` | Failed as intended: `Expected "4 of 20"`, `Received "20 of 20 counterpartiesFiltered CVA total $58,980,000"`. Reverted; green again. | Proves the test can fail. |

## Evidence
Final run (Chromium, headless, app started by `webServer`):
```
ok 1 [chromium] › e2e\cva-filter.spec.ts:3:1 › filtering by counterparty name narrows the table (949ms)
1 passed (5.9s)
```
Run with `npm run test:e2e` from `app/artifacts/cva-monitor`.

## Retro
- **Expected values from the data, not from memory:** the one failure in the build was a wrong expectation, not a bug. The test surfaced it in seconds; a hand-counted "3" would otherwise have gone into the repo as folklore. Derive expectations from `mock-data.json`.
- **Assert absence as well as presence:** `toHaveCount(0)` on a non-matching row is what makes this a filter test rather than a render test.
- **A test you have not seen fail is unproven:** the deliberate break was cheap (one line, one run) and is the real evidence.
- **Stable selectors paid off:** Module 2's `data-testid` attributes meant no app changes, and the Replit agent's habit of adding them was worth more than anything it did in the scaffold.
- **Web-first assertions:** no sleeps; `expect(...).toContainText` retries until the React state settles.
- **Known gaps (by design):** one test, one browser, no CI. Scope stays small.
