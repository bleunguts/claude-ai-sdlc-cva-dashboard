# Module 1: Design — Stitch

## Artefacts
| File | What |
|---|---|
| [UI-stitch.jpg](UI-stitch.jpg) | Stitch  "Counterparty CVA & CDS Monitor" light variant (same layout, slightly different scroll position)  (compact, ~25 rows visible) |
| [UI-stitch-professional-dark-theme.jpg](UI-stitch-professional-dark-theme.jpg) | Stitch dark "CVA MONITOR / LIVE TERMINAL" variant: top-bar filters, keyboard hints, breach flags, totals row |
| [UI-figma.jpg](UI-figma.jpg) | Same design rebuilt by Figma Make as a React app (8 rows, paginated) |
| AI Studio app | https://aistudio.google.com/apps/003b496e-ee72-4771-84ad-ae3273f9fa20 (source exportable to zip/GitHub; not committed, `app/` is reserved for the Replit build) |
| Figma Make | https://www.figma.com/make/FdhnuWTMnD3NvAiPMbQzQ8/Build-React-App |

## Prompt log
| # | Prompt | Result | What changed and why |
|---|---|---|---|
| 1 | Starter prompt (see ROADMAP.md) | CVA Charge Monitor; very detailed, extra nav and chrome | Baseline. Detail looked impressive but exceeded scope. |
| 2 | Stitch suggestion: counterparty deep-dive | BNP Paribas SA profile screen | Explored the suggestion feature. Out of scope for the one-table MVP, so not carried forward. |
| 3 | Remove all unused navigation items except Dashboard. Remove KPI cards. Keep only these columns: counterparty, CDS spread, tenor, CVA charge, timestamp. Reduce row height to 26px, right-align and use monospace for numeric columns, remove card containers and shadows, use thin 1px gridlines. | Counterparty CVA & CDS Monitor (UI-stitch.jpg) | Less clutter, more MVP: cut to the table and filters. |
| 4 | Redesign professional dark financial terminal theme (e.g. Bloomberg / institutional trading desk dark aesthetic matching Neon Tokyo / terminal dark mode with deep dark background #0d0f17 or #111420, crisp borders, high contrast accents). | Dark terminal variant (UI-stitch-professional-dark-theme.jpg) | Top-bar filters and a denser, Bloomberg-style look. |

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

**Verdict:** Stitch for generating the design, AI Studio for the quickest design-to-code, Figma for design-layer refinement. Replit Agent (Module 2) is the build tool under test.

## Retro
- The refinement worked better because it asked for less: less clutter, more MVP. Cutting nav, KPI tiles and extra columns left the table as the focus, which is what makes it read as terminal-dense.
- Figma Make drifted from the source design in typography and density. Re-prompting with explicit constraints (font family, row height) would be the fix.

## Decisions carried into Module 2
- **Chosen design:** the light variant, [UI-stitch.jpg](UI-stitch.jpg). The dark terminal variant ([UI-stitch-professional-dark-theme.jpg.jpg](UI-stitch-professional-dark-theme.jpg.jpg)) is reference only, not a build target. 
- **Mock data:** [mock-data.json](mock-data.json), 20 rows. `cdsSpreadBps` is the 5Y reference CDS spread; `tenor` is the maturity of the exposure with that counterparty, not a CDS tenor. `cvaCharge` is a static mock value (derived once from spread x exposure x tenor, not computed at runtime). `null` spread/CVA on Trafigura and two stale timestamps (Toyota, Siemens) are deliberate edge cases for Module 3.
- **LEIs:** seven copied from the mockups, the rest random 20-character codes. Not real LEIs.

## Module 1b: Design - Stitch
Iteration 1
Prompt #1: 
Create a design system from this screen: colours, type scale, 26px row density, monospace right-aligned numerics, red only for breaches. Keep terminal density, not consumer SaaS.

Result: 
This is a solid DESIGN.md: the 26px rows, monospace tabular numerics and the red-only-for-breaches rule are all concrete. It has a few problems that will hurt screens 2 and 3 if you commit it as it stands.

1. Two palettes in one file.

The frontmatter is Material-style auto-generated tokens: primary #0037b0, tertiary reds #8f000b and #bb0112, and error #ba1a1a.
The prose uses a different set: cobalt #1D4ED8, breach red #DC2626, green #16A34A.
Stitch will probably follow the frontmatter and a human will follow the prose. That is a drift risk, and the extra red tokens sit outside the “red only for breaches” rule.
Decide which is the source of truth and make the other match, or delete the redundant tokens.

2. The CVA breach threshold would turn most of the table red.

The rule flags CVA above $1.5M, but your mock CVA charges mostly sit around $3–5M (BNP is 3.08M).
A red-only-for-breaches rule that fires on nearly every row defeats its purpose.
The CDS above 200 bps rule is fine: only Brazil (205) and Petrobras (290.5) trip it.
Raise the CVA threshold, for example to $5M, or drop CVA flagging.

3. Module 1 scope crept back in.

It describes a telemetry ribbon with Agg CVA and VaR, a nav dock (CVA Sensitivity, Counterparty Limits, Monte Carlo) and engine node health.
You deliberately cut exactly these in Module 1, and the repo rule is “one feature”.
Every screen generated from this will bring them back. Trim the Layout section to a slim header plus the data canvas.

4. Gaps that matter for the credit screen.

Spread-change colour: there is no rule for widening versus tightening. Red is breach-only and green means engine health. Since your element edit targets the spread-change highlight, define it now, for example sign and weight only, or a neutral amber.
Components: nothing covers the proxy-flag chip, rating display, or chart colours for the term structure line.

Prompt #2: 
Revise the design system: (1) use one palette only, the prose hex values (#1D4ED8 cobalt, #DC2626 breach red, #16A34A green), and remove the Material-style tokens that conflict. (2) Breach red applies only when CDS spread is above 200 bps or CVA charge is above $5M, not $1.5M. (3) Remove the telemetry ribbon, Agg CVA and VaR, the left nav dock and engine health; the layout is a slim header plus the data canvas only. (4) Add rules for: spread change in bps (widening versus tightening, without using breach red), a proxy-flag chip, a rating column, and term structure chart line colours.

Result:
Summary of Revisions:
Unified Color Palette (Prose Hex Only):

Eliminated conflicting Material Design-style tokens in favor of direct institutional hex tokens: #1D4ED8 (Cobalt primary/controls), #DC2626 (Strict breach red), and #16A34A (Telemetry/tightening green).
Surfaces standardized to #FFFFFF containers, #F8FAFC base, #F1F5F9 sub-surfaces/headers, and #E2E8F0 / #CBD5E1 borders.
Revised Breach Threshold Rules:

Breach Red (#DC2626) is strictly reserved for:
CDS 5Y Spread > 200.0 bps
Net CVA Charge > $5,000,000 (updated from prior $1.5M).
Breaching rows receive #FEF2F2 background tint and bold monospace red metrics.
Layout Architecture Simplification:

Removed the left vertical navigation dock, top telemetry ribbons, aggregate CVA/VaR metric blocks, and engine health nodes.
Standardized layout to a slim workspace header (search, filtering, batch actions) and full-width 26px density data canvas.
Added Rules & Component Specifications:

Spread Change in bps (Δ):
Widening (+bps / deterioration): Amber #D97706 (with + prefix). Breach red is strictly prohibited.
Tightening (-bps / improvement): Green #16A34A (with - prefix).
Unchanged (0.0 bps): Slate #64748B.
Proxy-Flag Chip: Micro-badge (PROXY / MAP) with height 14px, text-[9px] font-mono font-bold, rendered in neutral slate (bg-[#F1F5F9] border-[#CBD5E1] text-[#475569]) or subtle cobalt outline (text-[#1D4ED8] bg-[#EFF6FF] border-[#BFDBFE]).
Rating Column: Monospace agency notch (Aa2 / AA, Baa1 / BBB+) in centered neutral badge (bg-[#F1F5F9] border-[#E2E8F0] text-[10px] text-[#334155]).
Term Structure Chart Line Colors:
Active / Benchmark Curve (5Y): Cobalt #1D4ED8 (1.5px solid)
Short/Intermediate Tenors (1Y/3Y): Slate #64748B (1px, 70% opacity)
Long Tenors (10Y/30Y): Navy #0F172A (1px, 85% opacity)
Proxy Curve: Cobalt dashed #1D4ED8
Historical EOD Baseline: Muted Slate #94A3B8 (1px dotted)
Breach Threshold Line: Red dashed #DC2626 at 200 bps.

Iteration 2
v2.1: hand-edited tenors to match mock data and fixed the PROXY label. Cheaper to hand-edit than to re-prompt.