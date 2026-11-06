# CVA Dashboard — AI-Assisted SDLC Walkthrough

## What this is
A small CVA (credit valuation adjustment) monitoring dashboard, used as a vehicle to get hands-on with one AI tool per stage of the software development lifecycle — not to rebuild the full pricing engine from a past role. The point is deliberate, stage-appropriate tool selection, demonstrated end to end, with a prompt-iteration story at each step worth retelling in an interview.

Pipeline: **Stitch → Replit Agent → Storybook → Playwright → CodeRabbit → Notion AI**

Two-part narrative this project is built to support: (a) real CVA domain depth — a full-stack CVA UI was previously built in React/C# — and (b) upskilling via AI-assisted development, shown by rebuilding the equivalent surface through this pipeline.

## How to work with me
- Weekend pacing, roughly one module per session. Keep each session scoped to its module — don't bleed into the next one.
- At the end of each module, update the status table in ROADMAP.md and log one or two lines under Session log below.
- I want a retro on *why* a prompt iteration worked better, not just the final output — that reasoning is the interview-relevant part.
- Keep "less is more": concise responses, no padding.

## Workflow per module
GitHub issue -> branch -> implementation -> PR. Never commit directly to `main`.
- Raise one issue per module (title `Module N: <stage> (<tool>)`), with the starter prompt, critique checklist and "Done when" from ROADMAP.md.
- Branch from `main` as `module-N-<tool>` (e.g. `module-1-stitch`).
- Each PR links the issue (`Closes #N`), contains the module's committed output artefact, and updates the ROADMAP.md status table and the Session log below.
- At the end of each session, suggest a commit message.

## Architecture
```
design/        -> Stitch output (mockup export, prompt log)
app/           -> React app scaffolded by Replit Agent (mock data: counterparty, CDS spread, tenor, CVA charge, timestamp)
app/.storybook -> Storybook stories for the grid component (empty / populated / error states)
app/artifacts/cva-monitor/e2e/ -> Playwright test(s) (config: playwright.config.ts alongside)
docs/          -> Notion AI writeup, exported
```

## Hard rules
- Scope stays small: one feature (the filterable CVA-by-counterparty table), not a pricing engine. CDS spreads are mock inputs, not computed.
- Each module's "Output" (per ROADMAP.md) must exist as a committed artefact before moving to the next module — a screenshot, a repo, a Storybook build, a passing test, a PR thread, a writeup.
- Module 5 (CodeRabbit) requires one intentionally left rough edge in the code — don't pre-fix it.
- Target aesthetic throughout: Bloomberg/AG Grid trading terminal density, not consumer SaaS — matches the real CVA dashboards this is modelled on.

## Session plan
Module-by-module plan, prompts, and status live in [ROADMAP.md](ROADMAP.md), the single source of truth. Update its status line and table at the end of each session.

## Session log
- Session 0: repo scaffolded from the claude-mcp-* template (README / CLAUDE.md / ROADMAP.md pattern). Domain settled on CVA (counterparty/CDS-spread monitoring) over FX, IR swaps or equity derivs — see ROADMAP.md for the reasoning. Module 1 (Stitch) not yet started.
- Session 1: Module 1 (Stitch). Generated the CVA monitor and a deep-dive screen; exported to AI Studio (clean code export) and Figma Make (clunky export, drifted on typography/density). Artefacts and comparison in design/README.md.
- Session 2: Module 2 (Replit Agent). Built the one-page CVA monitor in `app/` (`artifacts/cva-monitor`) from the light Stitch design and `design/mock-data.json`; iterated dark then back to light. Replit ignored "no backend" at the scaffold level (unused api-server/Postgres left in place). Prompt log and retro in app/PROMPTS.md.
- Session 3: Module 3 (Storybook). Isolated `CvaGrid` with Empty / Populated / Error stories (`src/CvaGrid.stories.tsx`, screenshots in `design/storybook-*.jpg`). Error state uses the existing `ErrorBoundary` as a decorator rather than a new prop. `storybook init` over-installed a Vitest/Playwright stack; pruned back to the two core packages. Retro in app/PROMPTS.md.
- Session 4: Module 4 (Playwright). One e2e test in `app/artifacts/cva-monitor/e2e/cva-filter.spec.ts`: load, filter on "group", assert 4 rows present and BNP absent. Written by hand with Claude coaching; my miscounted expectation (Citigroup) was caught by the test, and a deliberate filter break confirmed it can fail. Retro in app/PROMPTS.md.
- Session 5: Module 5 (CodeRabbit) blocked. Planted the unmemoised-filter edge in PR #21, but CodeRabbit never reviewed it despite install, reinstall, reopen and `@coderabbitai review`. Parked (PR and issue #16 left open) and moved to Module 6. Log in app/PROMPTS.md.
