# Roadmap

A six-module walkthrough of an AI-assisted SDLC, one tool per stage, run against a single small CVA monitoring dashboard. Each module's output is a concrete, interview-ready artefact — not just familiarity with a tool, but a demonstrated reason for picking it at that stage.

**Status:** Module 1 not yet started.

## Domain choice

CVA, not FX, IR swaps, equity derivs or general credit. Reasoning:
- Most recent hands-on domain work (full-stack CVA UI, React/C#) — the strongest, most current story to tell live.
- A sibling pet project ([claude-mcp-mispricing-watch-agent](https://github.com/bleunguts/claude-mcp-mispricing-watch-agent)) already covers IR rates depth, so CVA diversifies the portfolio rather than repeating it.
- CDS spreads are used here only as a pricing *input* to CVA, not full credit/CDS trading depth — keeping the claimed scope honest.
- Supports credit-related role applications directly, rather than as incidental overlap.

## Modules

| # | Module | Tool | Output | Status |
|---|---|---|---|---|
| 1 | Design | Stitch | Dashboard mockup (dense data table + filter panel), prompt iterated once | Planned |
| 2 | Build | Replit Agent | Working React repo, scaffolded from the Stitch design + mock CVA data | Planned |
| 3 | Component testing | Storybook | Grid component isolated, 2–3 stories (empty / populated / error) | Planned |
| 4 | E2E testing | Playwright | One passing test: load dashboard, apply filter, assert row(s) | Planned |
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
│   └─ .storybook/  stories for the grid component                                │
│       │                                                                          │
│       ▼                                                                          │
│  e2e/           Playwright test: load → filter → assert                         │
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

**Learn:** Writing a precise UI prompt — layout, data density, component list — and iterating critically on the first result.

**Starter prompt:**
> "Design a dashboard for monitoring CVA charge by counterparty. Include a dense data table (counterparty, CDS spread, tenor, CVA charge, timestamp) and a filter panel (counterparty selector, date range). Style: professional, financial services, minimal."

**Critique checklist before iterating:**
- Is the table actually dense (trading-terminal-like), or does it read as a generic SaaS list?
- Does the filter panel placement make sense (left rail vs top bar)?
- Any component present that should be cut for scope?

**Done when:** a refined mockup exists, exported to `design/`, plus a one-line note on what the second prompt changed and why.

## Module 2 design question

Replit Agent needs both the Module 1 design and a concrete data shape to scaffold against. Before starting: pin down the mock CVA dataset (20 rows — which counterparties, what tenor buckets, plausible CDS spread ranges, timestamp format) so the prompt to Replit Agent is unambiguous rather than left to its defaults.
