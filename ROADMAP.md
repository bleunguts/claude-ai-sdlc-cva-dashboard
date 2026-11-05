# Roadmap

A six-module walkthrough of an AI-assisted SDLC, one tool per stage, run against a single small CVA monitoring dashboard. Each module's output is a concrete, interview-ready artefact — not just familiarity with a tool, but a demonstrated reason for picking it at that stage.

**Status:** Modules 1 (Stitch), 2 (Replit Agent), 3 (Storybook) and 4 (Playwright) done. Artefacts in `design/`, `app/` and `app/artifacts/cva-monitor/src/CvaGrid.stories.tsx`. Module 5 (CodeRabbit) next. Issues raised in advance: #15 (M4), #16 (M5), #17 (M6).

## Domain choice

CVA, not FX, IR swaps, equity derivs or general credit. Reasoning:
- Most recent hands-on domain work (full-stack CVA UI, React/C#) — the strongest, most current story to tell live.
- A sibling pet project ([claude-mcp-mispricing-watch-agent](https://github.com/bleunguts/claude-mcp-mispricing-watch-agent)) already covers IR rates depth, so CVA diversifies the portfolio rather than repeating it.
- CDS spreads are used here only as a pricing *input* to CVA, not full credit/CDS trading depth — keeping the claimed scope honest.
- Supports credit-related role applications directly, rather than as incidental overlap.

## Modules

| # | Module | Tool | Output | Status |
|---|---|---|---|---|
| 1 | Design | Stitch (vs Figma AI / v0) | 2–3 dashboard mockup variants (dense data table + filter panel) + one refined version, with a tool comparison note | Done |
| 2 | Build | Replit Agent | Working React repo, scaffolded from the Stitch design + mock CVA data | Done |
| 3 | Component testing | Storybook | Grid component isolated, 2–3 stories (empty / populated / error) | Done |
| 4 | E2E testing | Playwright | One passing test: load dashboard, apply filter, assert row(s) | Done |
| 5 | Review | CodeRabbit | PR with a real AI review thread on an intentionally rough edge | Planned |
| 6 | Docs | Notion AI | One-pager: problem, approach, stack, what you'd change next time | Planned |

## How it is built

One module per weekend session. Each module: generate/build with the starter prompt → critique the output against specific criteria → refine with one targeted follow-up prompt → commit the output artefact → update this table.

## Architecture (target, by Module 2)

```
┌────────────────────────── claude-ai-sdlc-cva-dashboard ──────────────────────────┐
│                                                                                   │
│  design/        Stitch mockup export + prompt log                               │
│       │                                                                          │
│       ▼                                                                          │
│  app/           React app (Replit Agent scaffold)                               │
│   ├─ data: mock CVA data (counterparty, CDS spread, tenor, CVA charge,           │
│   │         timestamp — 20 rows)                                                 │
│   ├─ components: filterable data table + filter panel                           │
│   └─ .storybook/  stories (app/artifacts/cva-monitor/.storybook)                │
│       │                                                                          │
│       ▼                                                                          │
│  app/…/cva-monitor/e2e/  Playwright test: load → filter → assert                │
│       │                                                                          │
│       ▼                                                                          │
│  PR → CodeRabbit review thread                                                  │
│       │                                                                          │
│       ▼                                                                          │
│  docs/          Notion AI writeup, exported                                     │
└────────────────────────────────────────────────────────────────────────────────┘
```

### Design points

1. **Scope is deliberately small.** One feature — the filterable CVA-by-counterparty table — not a pricing engine. The pipeline is the thing being demonstrated, not the product.
2. **Every module ends in a committed artefact.** A mockup export, a repo, a Storybook build, a test run, a PR thread, a writeup — each one is something to point to or screenshot in an interview, not just "I tried the tool."
3. **Prompt iteration is part of the deliverable**, not throwaway scratch work — Module 1 and Module 5 both hinge on a deliberate first-attempt-then-refine step, and the reasoning behind the refinement is what gets retold.
4. **Target aesthetic:** Bloomberg/AG Grid trading terminal density throughout, not consumer SaaS — this shows up as a review criterion in Module 1 and should carry through Module 2's build. It also matches the real CVA dashboards this project is modelled on.

## Module 1: Design (Stitch)

**Learn:** Rapid UI prototyping with AI — the highest-leverage module, replacing hand-drawn mocks, UML diagrams and slide decks. Learn to write a precise UI prompt (layout, data density, component list), generate several variants, iterate critically, and compare the prototyping tools (Stitch vs Figma AI vs v0) so the choice can be justified.

**Starter prompt:**
> "Design a dashboard for monitoring CVA charge by counterparty. Include a dense data table (counterparty, CDS spread, tenor, CVA charge, timestamp) and a filter panel (counterparty selector, date range). Style: professional, financial services, minimal."

**Variants to generate (2–3):** e.g. left-rail vs top-bar filters; different data densities.

**Critique checklist before iterating:**
- Is the table actually dense (trading-terminal-like), or does it read as a generic SaaS list?
- Does the filter panel placement make sense (left rail vs top bar)?
- Any component present that should be cut for scope?

**Tool comparison:** run the same starter prompt in a second tool (Figma AI or v0, ~20 min timebox) and note what each does better or worse (fidelity, density control, editability, export, speed).

**Done when:** 2–3 variants plus one refined mockup exist, exported to `design/`, with a prompt log, a one-line note per iteration on what changed and why, and a short Stitch-vs-alternative comparison note.

## Module 2 design question (resolved)

Replit Agent needs both the Module 1 design and a concrete data shape to scaffold against. The mock CVA dataset is pinned in [design/mock-data.json](design/mock-data.json) (20 rows, 4 buckets, 1Y–10Y tenors, ISO-8601 UTC timestamps, deliberate null and stale-timestamp edge cases), and the chosen design is `design/UI-stitch.jpg`. See "Decisions carried into Module 2" in [design/README.md](design/README.md).

## Module 3: Component testing (Storybook) — done

Issue: #13. **Learn:** isolate a UI component and exercise its states without the full app. Stories: Empty, Populated (all 20 mock rows incl. null and stale timestamps), Error (existing `ErrorBoundary` as a decorator rather than a new `CvaGrid` prop). Config in `app/artifacts/cva-monitor/.storybook/`; screenshots in `design/storybook-*.jpg`. Retro in [app/PROMPTS.md](app/PROMPTS.md).

## Module 4: E2E testing (Playwright)

Issue: #15. **Learn:** drive the real app in a browser and assert on user-visible behaviour, using stable `data-testid` selectors and `webServer` config.

**Starter prompt:**
> "Add Playwright under `app/artifacts/cva-monitor/e2e/`. Write one test against the cva-monitor app: load the dashboard, assert the 20-row table, type a counterparty name into the search box, assert only the matching row(s) remain and the status summary updates. Use the existing `data-testid` selectors; start the app via `webServer`. No app code changes."

**Critique checklist:** web-first assertions (no sleeps); asserts both present and absent rows; expected data consistent with `design/mock-data.json`; reproducible startup; test fails when the filter is broken.

**Done when:** one Playwright test in `app/artifacts/cva-monitor/e2e/` passes from a clean start, with run evidence committed and a prompt log and retro in `app/PROMPTS.md`.

## Module 5: Review (CodeRabbit)

Issue: #16. **Learn:** what an AI reviewer catches and misses on a real PR, and how to triage its comments.

**Starter prompt (to plant the edge):**
> "Make a small, plausible change to the CVA table filter/format code that works but has one real quality issue a reviewer should catch. Do not add a comment pointing at it."

**Critique checklist:** edge is real and recorded before the PR opens; CodeRabbit hit/miss recorded; every other comment classed useful / noise / wrong; at least one follow-up round.

**Done when:** a PR with one intentional rough edge and a real CodeRabbit thread exists, with triage notes and thread evidence committed. Note: the edge must not be pre-fixed in earlier modules.

## Module 6: Docs (Notion AI)

Issue: #17. **Learn:** turn project notes into a concise, accurate writeup for an interview audience, and fact-check AI output against the repo.

**Starter prompt:**
> "From these notes, write a one-page summary: the problem (monitoring CVA by counterparty), the approach (one AI tool per SDLC stage), the stack, and what I'd change next time. Factual and concise. CDS spreads are mock inputs; don't claim a pricing engine."

**Critique checklist:** every claim true to the repo; per-stage "why this tool" present; honest about what went wrong; both narrative threads (CVA depth, AI upskilling) covered; one page.

**Done when:** the one-pager is exported to `docs/`, fact-checked, with a prompt log and retro, and this table shows all six modules done.
