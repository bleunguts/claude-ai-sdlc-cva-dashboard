# Module 1: Design — Stitch

## Artefacts
| File | What |
|---|---|
| [UI-stitch.jpg](UI-stitch.jpg) | Stitch "Counterparty CVA & CDS Monitor" (compact, ~25 rows visible) |
| [UI-stitch-2.jpg](UI-stitch-2.jpg) | Stitch light variant, near-identical to the first (same layout, slightly different scroll position) |
| [UI-stitch-3.jpg](UI-stitch-3.jpg) | Stitch dark "CVA MONITOR / LIVE TERMINAL" variant: top-bar filters, keyboard hints, breach flags, totals row |
| [UI-figma.jpg](UI-figma.jpg) | Same design rebuilt by Figma Make as a React app (8 rows, paginated) |
| AI Studio app | https://aistudio.google.com/apps/003b496e-ee72-4771-84ad-ae3273f9fa20 (source exportable to zip/GitHub; not committed, `app/` is reserved for the Replit build) |
| Figma Make | https://www.figma.com/make/FdhnuWTMnD3NvAiPMbQzQ8/Build-React-App |

## Prompt log
| # | Prompt | Result | What changed and why |
|---|---|---|---|
| 1 | Starter prompt (see ROADMAP.md) | CVA Charge Monitor; very detailed, extra nav and chrome | Baseline. Detail looked impressive but exceeded scope. |
| 2 | Stitch suggestion: counterparty deep-dive | BNP Paribas SA profile screen | Explored the suggestion feature. Out of scope for the one-table MVP, so not carried forward. |
| 3 | Remove all unused navigation items except Dashboard. Remove KPI cards. Keep only these columns: counterparty, CDS spread, tenor, CVA charge, timestamp. Reduce row height to 26px, right-align and use monospace for numeric columns, remove card containers and shadows, use thin 1px gridlines. | Counterparty CVA & CDS Monitor (UI-stitch.jpg) | Less clutter, more MVP: cut to the table and filters. |
| 4 | Redesign professional dark financial terminal theme (e.g. Bloomberg / institutional trading desk dark aesthetic matching Neon Tokyo / terminal dark mode with deep dark background #0d0f17 or #111420, crisp borders, high contrast accents). | Dark terminal variant (UI-stitch-3.jpg) | Top-bar filters and a denser, Bloomberg-style look. |

## Critique (against the roadmap checklist)
- **Density:** Stitch result is genuinely terminal-like: ~25 rows visible, monospace right-aligned numerics, flat gridlines, Compact/Standard toggle, red only for high spread / CVA.
- **Filters:** search + bucket filters (All / G-SIBs / Sovereigns / Corporates / Commodities) + column controls. Placement is fine.
- **Cut for scope:** unused nav (CVA Sensitivity, Counterparty Limits, Monte Carlo Engine, Stress Testing), top-bar Agg CVA / VaR, user block, notification bell. Figma Make version kept only "Dashboard" in the nav.

## Tool comparison
| Tool | Role here | Fidelity | Density control | Editability | Code export | Speed |
|---|---|---|---|---|---|---|
| Stitch | Generate the design | High, detailed | Good via prompt (Compact toggle appeared) | Prompt-based | HTML/CSS, Figma paste | Fast |
| AI Studio | Design to app | Generated a working app from the Stitch export (screenshot not captured) | Inherited from the Stitch export | Chat | Easy: zip or GitHub | Fast |
| Figma + Figma Make | Refine, design to app | Drifted: serif font, lost monospace numerics and Compact/Standard toggle, 8 rows with pagination (denser in Stitch) | Weak | Strong on design layers | Clunky, hard to find | Medium |

**Verdict (draft):** Stitch for generating the design, AI Studio for the quickest design-to-code, Figma for design-layer refinement. Replit Agent (Module 2) is the build tool under test.

## Retro
- The refinement worked better because it asked for less: less clutter, more MVP. Cutting nav, KPI tiles and extra columns left the table as the focus, which is what makes it read as terminal-dense.
- Figma Make drifted from the source design in typography and density. Re-prompting with explicit constraints (font family, row height) would be the fix.
