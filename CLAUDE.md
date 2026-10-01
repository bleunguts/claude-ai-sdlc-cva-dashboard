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
Follow the shared workflow in `~/.claude/CLAUDE.md` (issue -> `feature/<n>-name` branch -> PR with `Closes #N`). Module-specific additions:
- Raise one issue per module (title `Module N: <stage> (<tool>)`), with the starter prompt, critique checklist and "Done when" from ROADMAP.md.
- Each PR contains the module's committed output artefact and updates the ROADMAP.md status table and the Session log below.

## Architecture
```
design/        -> Stitch output (mockup export, prompt log)
app/           -> React app scaffolded by Replit Agent (mock data: counterparty, CDS spread, tenor, CVA charge, timestamp)
app/.storybook -> Storybook stories for the grid component (empty / populated / error states)
e2e/           -> Playwright test(s)
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
