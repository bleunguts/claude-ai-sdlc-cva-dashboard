# Retrospective inputs (for a Notion AI deep dive)

Source notes to paste into a Notion page before prompting Notion AI for a detailed learning retrospective. Every line is lifted from the repo, `git log`, or the GitHub issue/PR metadata as of 2026-11-11; nothing here is new. Where the sources are silent the text says "not recorded". Repo: https://github.com/bleunguts/claude-ai-sdlc-cva-dashboard

Companion to [notion-inputs.md](notion-inputs.md) (Module 6 inputs, covers Modules 1 to 6 only). This page adds the history, Modules 1b and 1c, metrics and cross-module patterns.

## 1. Timeline (git log, squash-merge dates)
| Date | Commit | What |
|---|---|---|
| 2026-10-01 | Initial commit; #2, #3 (PRs #2, #4) | Repo scaffolded from the claude-mcp-* template; per-module workflow added to CLAUDE.md; Claude config aligned with shared workflow rules (issue #3) |
| 2026-10-06 | #1 (PR #5), PR #7 | Module 1 Stitch artefacts, prompt log, tool comparison. Issue #8 (Module 1 cleanup, recording design and data decisions) opened the same day |
| 2026-11-03 | #8 (PR #9), #10 (PR #11) | Module 1 cleanup merged (PR #9 opened 2026-10-06); `design/UI-stitch.jpg` restored after PR #9 deleted it (issue #10) |
| 2026-11-04 | #6 (PR #12), README edit, #13 (PR #14), #18 (PR #19) | Module 2 Replit build (+26,715 / -9 lines, 208 files, mostly scaffold); Module 3 Storybook; ROADMAP detail for Modules 3 to 6 |
| 2026-11-05 | #15 (PR #20) | Module 4 Playwright e2e (8 files, +138 / -10) |
| 2026-11-06 | #16 (PR #22), #17 (PR #23) | Module 5 marked blocked; Module 6 Notion AI one-pager. PR #21 (planted edge) opened 2026-11-06, still open |
| 2026-11-09 | #26 (PR #27) | ROADMAP: Modules 1b and 1c added |
| 2026-11-10 | #24 (PR #28) | Module 1b design system and multi-screen (19 files, +1,995 / -2) |
| 2026-11-11 | PR #29, #30 (PR #31) | Module 1c Stitch MCP (8 files, +569 / -2); Stitch cleanup of four DESIGN.md screens, comment on stale screens |

Active days with commits on `main`: 2026-10-01, 10-02, 10-06, 11-03, 11-04, 11-05, 11-06, 11-09, 11-10, 11-11. Gap between 2026-10-06 and 2026-11-03 (28 days): reason not recorded. Hours worked per module: not recorded. PR open-to-merge times are mostly minutes (for example #5 17 min, #12 4 min, #14 under 1 min, #29 under 1 min), so they say nothing about time spent building. Exceptions: PR #9 was open 2026-10-06 to 2026-11-03, and PR #21 is still open.

## 2. Issues and PRs
| Issue | Title | Created | Closed | Linked PR(s) |
|---|---|---|---|---|
| #1 | Module 1: Design (Stitch) | 2026-10-01 | 2026-10-06 | #5, #7 |
| #3 | Align Claude config with shared personal workflow rules | 2026-10-01 | 2026-10-01 | #4 |
| #25 | Module 1c: Design hand-off via MCP (Stitch + Claude Code) | 2026-11-06 | 2026-11-11 | #29 |
| #6 | Module 2: Build (Replit Agent) | 2026-10-06 | 2026-11-04 | #12 |
| #8 | Module 1 cleanup before Module 2 | 2026-10-06 | 2026-11-03 | #9 |
| #10 | Restore design/UI-stitch.jpg deleted in PR #9 | 2026-11-03 | 2026-11-03 | #11 |
| #13 | Module 3: Component testing (Storybook) | 2026-11-04 | 2026-11-04 | #14 |
| #15 | Module 4: E2E testing (Playwright) | 2026-11-04 | 2026-11-05 | #20 |
| #16 | Module 5: Code review (CodeRabbit) | 2026-11-04 | open | #21 (open), #22 |
| #17 | Module 6: Docs (Notion AI) | 2026-11-04 | 2026-11-06 | #23 |
| #18 | Roadmap: add Module 3-6 detail sections | 2026-11-04 | 2026-11-04 | #19 |
| #24 | Module 1b: Design system and multi-screen flow (Stitch) | 2026-11-06 | 2026-11-10 | #28 |
| #26 | Roadmap: add Modules 1b and 1c | 2026-11-09 | 2026-11-09 | #27 |
| #30 | Stitch cleanup: four DESIGN.md screens and propagated orange breach colour | 2026-11-11 | 2026-11-11 | #31 |
| #32 | Module 7: Wire credit spread screen into the app | 2026-11-11 | open | none yet |

Counts: 15 issues (13 closed, 2 open: #16, #32); 17 PRs (16 merged, 1 open: #21). No PR has a recorded review (0 reviews on every PR checked, which is all of them except #21's comment-only thread: 1 comment, 0 reviews). Only issue #17 has a comment. Issues were raised in advance for Modules 3 to 6 on 2026-11-04.

Process notes visible in the history:
- Issue #10 and PR #11 exist because PR #9 deleted a file that was still needed (title: "Restore design/UI-stitch.jpg deleted in PR #9").
- Issue #8 and PR #9 (Module 1 cleanup) were open 2026-10-06 to 2026-11-03, spanning the 28-day gap.
- Branch naming differs: `module-N-<tool>` (module work, per CLAUDE.md) vs `feature/<issue>-name` (everything else, per the personal workflow).
- PR #7 ("Module 1 stitch") and PR #29 ("Module 1c stitch mcp") have no `#N:` prefix, unlike the rest.

## 3. Per-tool prompt iterations (from `design/README.md` and `app/PROMPTS.md`)
**Module 1 Stitch (issue #1).** 4 prompts. #1 starter prompt: detailed but over scope (extra nav and chrome). #2 Stitch's own suggestion, a counterparty deep-dive: explored, not carried forward. #3 cut nav, KPI cards and extra columns, 26px rows, monospace right-aligned numerics, 1px gridlines: became `UI-stitch.jpg`. #4 dark terminal theme: reference only. Why #3 worked: it asked for less. Tool comparison: Stitch generates; AI Studio gave the quickest design-to-code (one prompt, no follow-ups); Figma Make drifted (serif font, lost monospace numerics and Compact/Standard toggle, 8 paginated rows). Decision: light variant is the build target.

**Module 2 Replit Agent (issue #6).** 3 prompts. #1 spec prompt: UI followed every constraint but the scaffold was a pnpm monorepo with an unused Express api-server, Postgres/Drizzle, OpenAPI packages, a mockup-sandbox and about 50 shadcn components ("no backend" constrained the app, not the scaffold). #2 dark theme: a detour that contradicted the Module 1 decision, reverted. #3 theme-only: explicit hex palette plus "Do not change layout, features, data, filters, sorting or the `CvaGrid` props": a three-file diff. AI Studio export vs Replit build compared on 7 criteria; the takeaway: design-export tool for pixels fast, agent for controlled structure and your dataset; neither removed the cleanup. Left in place on purpose: unused scaffold, a hardcoded "Snapshot · 06 Oct 2026" label, a runtime Google Fonts import.

**Module 3 Storybook (issue #13).** Hand-written stories, Claude Code as reviewer. 4 steps. `storybook init` over-installed (Vitest addon, Playwright provider, Chromatic, MCP addons, rewrote `vite.config.ts`); pruned to `storybook` and `@storybook/react-vite`. Wrong import and an inverted decorator fixed. Error state uses the existing `ErrorBoundary` as a decorator rather than an error prop. A green build did not prove a story rendered; screenshots did. Rough edge: fallback uses `min-h-screen`.

**Module 4 Playwright (issue #15).** Test typed by hand, Claude Code coaching. 4 steps. Config first scaffolded at repo root, moved into `artifacts/cva-monitor`. Expected "3 of 20" for filter "group"; received 4 (Citigroup contains "group"): the expectation was wrong, not the app. Added `toHaveCount(0)` for BNP Paribas. Deliberate break (`matchesCounterparty = true`) failed as intended. Final: 1 passed (5.9s). Gaps: one test, one browser, no CI.

**Module 5 CodeRabbit (issue #16, PR #21).** Planted an unmemoised `filteredRows` in `App.tsx`. 5 steps tried (install, open PR, `@coderabbitai review`, close and reopen, reinstall): no review, comment or status check. Ruled out private repo, draft PR, config file, repo selection. Webhook deliveries are owner-only so not inspectable. Support contact: pending, no outcome recorded. Cause: unconfirmed. Parked; no review results exist.

**Module 6 Notion AI (issue #17).** 4 prompts. #1 starter: accurate on figures and Module 5 but no "why this tool", a false "scaffold pruned" claim, one clause of CVA depth. #2 targeted refinement (swap columns, correct the Build row, "use only facts from my notes"): fixed per-stage reasoning and the Build row; introduced a duplicated lessons paragraph and missing links. #3 hand edits in Notion: introduced "Figma Make/AI Studio drifted" (wrong: AI Studio exported cleanly). #4 repo fix after fact-check. PDF exports removed because they contained uncorrected text.

**Module 1b Stitch design system (issue #24).** 4 iterations. DESIGN.md prompt #1 produced two palettes (Material tokens plus prose hex), a $1.5M CVA breach threshold that would flag most rows, and Module 1 scope creep (telemetry ribbon, nav dock, engine health). Prompt #2 had 4 numbered fixes (one palette, threshold to $5M, remove ribbon and dock, add rules for spread change, PROXY chip, rating, chart lines): fixed. v2.1 hand-edit for tenors and PROXY label ("cheaper to hand-edit than to re-prompt"). Deep-dive prompt (iteration 2) over-scoped: two tables, a chart, metric strip, engine telemetry, top-tab nav, brand name differing (APEX RISK TERMINAL vs APEX RISK ANALYTICS), Net CVA $4,120,450 vs `mock-data.json` $3,080,000. Credit dashboard prompt (iteration 3) listed exclusions and exact rows and tenors: near-zero drift, remaining drift logged (0-200 bps chart axis, "Credit Spreads" nav item with no "Dashboard", pink breach row tint, 5D header wrapping). Prototype click-through worked. Route A: Claude Code built `CreditSpreadGrid` from the manual export (typecheck clean; Storybook renders 20 rows; not wired into `App.tsx`).

**Module 1c Stitch MCP (issue #25).** Route B: Claude Code pulled the credit dashboard and DESIGN.md through the Stitch MCP server; key at user scope, not in the repo. Official docs page rendered blank so endpoint and auth came from a third-party guide (unverified). Built `CreditSpreadGridB` with tokens from DESIGN.md via `scripts/gen-tokens.mjs`; 22/22 browser checks; 17 of 18 colours from tokens. Findings: HTML identical to the manual export apart from whitespace but retyped by the model; PROXY chip slate (DESIGN.md) vs cobalt (layout HTML); four DESIGN.md screens with no timestamp or version, current one identified by content diff; "Edit with AI" created a new screen instead of editing in place; propagating a breach-colour change rewrote hard-coded hex on three desktop screens and changed their file ids; regenerating tokens changed exactly 3 lines. Follow-up #30: three non-canonical copies deleted, breach colour reverted to `#DC2626`, canonical id `8637484283435303626`.

## 4. Where the human caught the AI, and the reverse
Human caught AI:
- Notion AI "scaffold pruned" claim (false), caught by fact-check against the notes (Module 6).
- Stitch deep-dive data (Net CVA $4,120,450) not matching `mock-data.json` (Module 1b).
- DESIGN.md two palettes, $1.5M threshold, scope creep (Module 1b).
- Storybook init over-installing and rewriting `vite.config.ts`, caught by reviewing the diff (Module 3).
- Replit's unused scaffold, caught by inspecting it (Module 2).
- Stale or ambiguous DESIGN.md screens, caught by diffing content (Module 1c).

AI or tooling caught human:
- Playwright run caught the Citigroup miscount (expected 3, got 4) (Module 4).
- Claude Code review of Storybook stories: wrong import, inverted decorator (Module 3).
- Claude flagged DESIGN.md vs layout HTML disagreement on the PROXY chip colour (Module 1c).

Human errors not caught by AI: a hand edit introduced a factual error in the Notion one-pager (Module 6); PR #9 deleted a needed file (issue #10); Module 2 dark-theme prompt contradicted a recorded decision.

## 5. Cross-module patterns (as stated in the retros)
1. Asking for less produces cleaner output: Module 1 prompt #3, Module 2 prompt #3, Module 6 prompt #2 (name what to change and what not to touch).
2. Exact data and explicit exclusions beat style guidance: Module 1b credit dashboard vs deep-dive; a design system controls style, not scope.
3. Generators over-deliver and defaults are not scope: Replit scaffold, `storybook init`, AI Studio's `@google/genai`/`express`.
4. A green build is not evidence: Storybook stories, Playwright expected values; screenshots and deliberate breaks are.
5. Derive expectations from the data, not from memory (Module 4).
6. Third-party integrations fail silently; verify on a throwaway first (Module 5; Stitch edits creating new screens, Module 1c).
7. Check prompts against recorded decisions before running them (Module 2 dark theme).
8. Hand edits and AI output both need fact-checking against source (Module 6).
9. Inputs carry the honesty: Module 5 "blocked" stayed honest in the one-pager because the notes said so.
10. Pin and record the exact input version (Stitch screen ids) because tools edit in place by creating new copies.

## 6. Metrics available from the sources
| Module | Issue | PR | Prompts or iterations logged | Output |
|---|---|---|---|---|
| 1 Stitch | #1 | #5, #7 | 4 prompts | Mockups, tool comparison |
| 2 Replit | #6 | #12 | 3 prompts | React app (`app/`) |
| 3 Storybook | #13 | #14 | 4 steps | 3 stories, 3 screenshots |
| 4 Playwright | #15 | #20 | 4 steps | 1 test, 1 passed (5.9s) |
| 5 CodeRabbit | #16 | #21 (open), #22 | 5 attempts | None (blocked) |
| 6 Notion AI | #17 | #23 | 4 prompts | One-pager |
| 1b Stitch DS | #24 | #28 | 4 iterations plus Route A | DESIGN.md, 3 screens, `CreditSpreadGrid` |
| 1c Stitch MCP | #25 | #29 | 1 build prompt, 1 edit prompt | `CreditSpreadGridB`, A vs B table |

Not recorded: wall-clock hours per module, token or cost usage, number of Claude Code sessions per module beyond the CLAUDE.md session log (Sessions 0 to 8).

## 7. Open questions and unverified claims
- CodeRabbit root cause (account, repo, PR or vendor side): unconfirmed; support response not recorded.
- Stitch MCP endpoint and auth came from a third-party guide, not verified against official docs (docs page rendered blank).
- Stitch features were first taken from secondary coverage; DESIGN.md generation, prototype click-through and element-level edit were then verified hands-on.
- The 28-day gap between 2026-10-06 and 2026-11-03: reason not recorded.
- Replit scaffold, hardcoded snapshot label and runtime Google Fonts import are still in the repo.
- Credit screens are not yet in the running app (`CreditSpreadGrid` and `CreditSpreadGridB` are Storybook-only). Module 7 (issue #32) covers wiring.
- Confidentiality: keep domain depth generic; no detail from prior roles.
