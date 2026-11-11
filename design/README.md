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

Prompt:
Using the attached design system (DESIGN.md), redesign the BNP Paribas SA counterparty deep-dive screen. Same terminal density as the CVA monitor: 26px rows, monospace right-aligned numerics, breach red only for CDS above 200 bps or CVA above $5M. No left nav dock, no telemetry ribbon, no KPI cards. Show: counterparty header (name, LEI, bucket, rating), a small table of its trades or exposure, and CDS spread plus CVA charge as plain numbers.

Result:
Over-scoped. I asked for “a small table of trades or exposure”. You got two full tables, a chart, a header metric strip (Net CVA, Gross Notional, Net MTM, CSA), a Scenario Shock button, and Export Exposure CSV. That is the “more is more” problem again.
Engine telemetry came back.
There is a footer line “Simulation engine: 50,000 Hull-White 2F...”, plus “Curve engine: MC-v4.19 [CONVERGED]” in the header.
It reintroduces what I told it to remove.
Navigation pattern differs from the monitor.
The deep-dive uses top tabs (Risk Canvas | Counterparties).
The monitor has a left rail.
The brand name also differs: APEX RISK TERMINAL here, APEX RISK ANALYTICS there.
This is the biggest threat to “reads as one product”.
Data doesn’t match your files.
Net CVA shows $4,120,450. mock-data.json has BNP at $3,080,000. It was copied from the old monitor image, which also had different numbers.
The tenor table has 2Y and 30Y rows, but mock-credit.json has only six tenors.
Possible colour issues, which I can’t confirm at this resolution.
Negative MTM and CVA contribution values (for example -$1,210,000) may be red.
DESIGN.md says breach red is not for negative values within policy.
Zoom in and check.

Iteration 3
Prompt: 
Using the attached design system (DESIGN.md), design a credit spread dashboard. Same terminal density as the CVA monitor: 26px rows, monospace right-aligned numerics. Use the same left-rail navigation and the name APEX RISK ANALYTICS as the CVA monitor. No telemetry ribbon, no KPI cards, no engine or simulation footer, no extra action buttons.

Main table, columns only: Entity, Rating, Sector, 5Y Spread (bps), 1D Change (bps), 5D Change (bps), Proxy flag, and a “CVA” link. Spread changes: widening in amber with +, tightening in green with -. Breach red only for a 5Y spread above 200 bps. Use exactly these rows:

Entity	Rating	Sector	5Y	1D	5D	Proxy
BNP Paribas SA	A+	Financials	64.2	+0.8	+2.1	
Deutsche Bank AG	BBB+	Financials	112.4	+3.4	+9.6	
Republic of Italy	BBB	Sovereign	118.0	-2.2	-5.4	
Federative Republic of Brazil	BB	Sovereign	205.0	+6.8	+14.5	
Toyota Motor Corp	A+	Consumer Discretionary	38.5	+0.1	-0.4	
Petróleo Brasileiro SA	BB	Energy	290.5	+8.9	+21.3	
Trafigura Group	NR	Materials	140.0	+3.0	+8.0	PROXY

Below the table, one term structure chart for the selected name (BNP Paribas SA) with exactly these tenors and spreads in bps: 6M 28.9, 1Y 37.2, 3Y 54.6, 5Y 64.2, 7Y 69.3, 10Y 73.2. Add a “View CVA charge” link beside the chart title. Nothing else.Using the attached design system (DESIGN.md), design a credit spread dashboard. Same terminal density as the CVA monitor: 26px rows, monospace right-aligned numerics. Use the same left-rail navigation and the name APEX RISK ANALYTICS as the CVA monitor. No telemetry ribbon, no KPI cards, no engine or simulation footer, no extra action buttons.

Main table, columns only: Entity, Rating, Sector, 5Y Spread (bps), 1D Change (bps), 5D Change (bps), Proxy flag, and a “CVA” link. Spread changes: widening in amber with +, tightening in green with -. Breach red only for a 5Y spread above 200 bps. Use exactly these rows:

Entity	Rating	Sector	5Y	1D	5D	Proxy
BNP Paribas SA	A+	Financials	64.2	+0.8	+2.1	
Deutsche Bank AG	BBB+	Financials	112.4	+3.4	+9.6	
Republic of Italy	BBB	Sovereign	118.0	-2.2	-5.4	
Federative Republic of Brazil	BB	Sovereign	205.0	+6.8	+14.5	
Toyota Motor Corp	A+	Consumer Discretionary	38.5	+0.1	-0.4	
Petróleo Brasileiro SA	BB	Energy	290.5	+8.9	+21.3	
Trafigura Group	NR	Materials	140.0	+3.0	+8.0	PROXY

Below the table, one term structure chart for the selected name (BNP Paribas SA) with exactly these tenors and spreads in bps: 6M 28.9, 1Y 37.2, 3Y 54.6, 5Y 64.2, 7Y 69.3, 10Y 73.2. Add a “View CVA charge” link beside the chart title. Nothing else.

Result:
Matches the prompt and design system

Nav and brand: left rail, APEX RISK ANALYTICS, and no ribbon, KPI cards, footer or extra buttons. The deep-dive’s scope drift is gone.
Data: all seven rows match exactly, and the term structure values (28.9, 37.2, 54.6, 64.2, 69.3, 73.2) are correct.
Colour rules:
Widening is amber and tightening is green. Italy and Toyota’s 5D are green.
Breach red appears only on Brazil (205) and Petrobras (290.5).
Components: the PROXY chip is on Trafigura only, the others show a dash, and the rating chips are neutral.
Link back to CVA: the CVA column links and “View CVA charge” are both there.
Selected row: BNP is highlighted blue and matches the chart title.

Drift to log (minor)

Chart scale: the 200 bps limit line stretches the y-axis to 0–200, which squashes BNP’s curve into the bottom third. The “LIMIT 200 bps” label is also clipped at the right edge.
Nav item changed: “Credit Spreads” is active and there is no “Dashboard” item, so the monitor and credit screens don’t share a visible nav entry. This matters for the prototype click-through. Check both screens can link to each other.
Breach rows are tinted: the full row gets a pink background, whereas the monitor only colours the value red. That is allowed by DESIGN.md (breach-red-bg), but it differs from the monitor.
Legend: it seems to print a raw hex code next to “5Y Benchmark Curve”, which shouldn’t be user-facing. I can’t read it at this resolution, so zoom to confirm.
Header row: “5D CHANGE (BPS)” wraps to two lines, so the header is taller than the 24px spec.
Row height: I can’t verify the 26px from the screenshot.

Retro

Listing the exclusions and the exact rows, with the lessons from the deep-dive baked in, got you near-zero drift.
The deep-dive prompt described what to include. This one also said what to leave out, and gave the data, which is the difference.

Iteration 4
Prototype worked, home screen is the Credit dashboard I can navigate to CVA dashboard via CVA column links and CVA Page link.  I can click on the counterparty and drill down into the detail.


## Route A: manual export to React component
- **Export:** `design/stitch-export/` holds `code.html` (one self-contained Tailwind-CDN file) and `screen.png`; I copied `DESIGN.md` v2.1 in by hand.
- **Build:** Claude Code built `CreditSpreadGrid` (`app/artifacts/cva-monitor/src/CreditSpreadGrid.tsx`, with `.css` and `.stories.tsx`) from that export. It is props-driven (`rows`, optional `selectedLei`, `onSelect`, `cvaHref`), reads a copy of `mock-credit.json`, follows the `CvaGrid` pattern (`data-testid` on table, rows, proxy chips and links) and adds no dependencies. It is not wired into `App.tsx`. Screenshot: [UI-credit-component.jpg](UI-credit-component.jpg).
- **Checks:** typecheck clean before and after. In Storybook the Populated story renders all 20 rows, rows and header measure 26px, breach red shows on Brazil and Petrobras only, PROXY shows on Vitol and Trafigura, and selecting a row updates the term structure. No console errors.
- **What the export gave:** exact colours, the 26px rule and the chart geometry. The HTML is hard-coded for 7 rows and one curve, so selection, thresholds and the data layer had to be written, not translated.
- **What changed in translation:** Tailwind classes became plain CSS to match `CvaGrid`, and the chart is inline SVG computed from data rather than fixed coordinates.
- **Known gaps:** I kept the export's 0 to 200 bps axis, so low-spread curves still look flat (drift 1 under iteration 3). The app loads DM Mono, not the Inter and JetBrains Mono from DESIGN.md, so numerics render in DM Mono.

## Evidence
Screens: [UI-stitch-deepdive.jpg](UI-stitch-deepdive.jpg), [UI-stitch-credit.jpg](UI-stitch-credit.jpg), [UI-stitch-credit-edit.jpg](UI-stitch-credit-edit.jpg) (after the element-level edit). Prototype: [prototype-clickthrough.gif](prototype-clickthrough.gif), [prototype-1-monitor.jpg](prototype-1-monitor.jpg), [prototype-1-cva.jpg](prototype-1-cva.jpg).

## Retro (Module 1b)
- **A design system controls style, not scope.** The first DESIGN.md looked polished but carried two palettes, a CVA threshold ($1.5M) that would have turned most rows red, and the Module 1 clutter I had already cut (ribbon, nav dock, engine telemetry). One revision prompt with four numbered fixes sorted it, and two small leftovers (tenors, PROXY vs MAP) were quicker to hand-edit than to re-prompt.
- **Inheriting the system did not stop invention.** The deep-dive picked up the colours and density but added two tables, engine telemetry, top-tab navigation and CVA figures that did not match `mock-data.json`.
- **Saying what to leave out, and giving the data, worked.** The credit screen prompt listed the exclusions and the exact rows and tenors, and came back with near-zero drift. Same design system, so the difference was the prompt.
- **Stitch features verified hands-on:** DESIGN.md generation, prototype click-through, and element-level edit all exist. The generated prototype let me click through from the credit dashboard to the CVA screen and into the counterparty drill-down (iteration 4).
- **Route A:** the export is a good visual spec, not a component. Most of the Claude Code work was the data layer and behaviour around it. Module 1c will test whether the MCP route closes that gap.
- **Bank context:** real use would need InfoSec and data-governance approval, and synthetic data only, as here.

## Route B: claude mcp export

## Retro (Module 1c)
Finding: MCP returns the same HTML as the manual export, apart from whitespace.
Caveat: the HTML is retyped by the model, since it comes back inline with no direct-to-disk path. It matched this time, but nothing guarantees it will on a larger screen. The screenshot and the design-system list are saved by the harness and are exact.
Minor: the screenshot is 1600×1280, while the listing says 2560×2048.

Stale DESIGN.md screens:
- Stitch held three DESIGN.md screens: `8f8346c1a38b42ec9eb87f056dfa4305` (no section 7), `b6dbaaac855841ed9287eafa3e3005df` ("DESIGN.md (Revised)", has PROXY or MAP and a 30Y tenor) and `8637484283435303626` (newest, matches the committed v2.1). The Step 6b edit added a fourth, `3252c79acdd94e70a367d5c6e55a160b`.
- Titles do not identify the current one. I picked `8637…` by diffing content, not by name or by any MCP field.
- `list_screens` returns only id, title, device type, size and download links. There is no timestamp or version, so the MCP gives no way to tell which copy is current.
- Resolved (#30): the three non-canonical copies were deleted in the Stitch UI. `8637484283435303626` is the canonical DESIGN.md, and the screens' breach colour was put back to `#DC2626`, confirmed by re-pulling the Credit Spread Dashboard. The revert is written as inline styles, so the HTML differs from the original but stays hard-coded hex.

## Prompt:
Build a React component `CreditSpreadGridB` for the credit spread dashboard, using the Stitch MCP tools to pull the inputs.

Inputs (pull via MCP, read-only, don't edit anything in Stitch):
- Layout reference: the desktop "Credit Spread Dashboard" screen's HTML in project "Terminal Density Design System".
- Design system: the newest DESIGN.md screen (the one with section 7, 7Y/10Y tenors, no MAP). Say which screen id you used and why.
- Save the pulled files outside the repo and read them from disk, not from memory.

Component:
- Props-driven: `rows` (shape of `design/mock-credit.json`), optional `selectedLei`, `onSelect`, `cvaHref`. No data fetching, no new dependencies.
- Table columns: Entity, Rating, Sector, 5Y spread (bps), 1D change, 5D change, Proxy, CVA link.
- 26px rows and header, monospace right-aligned numerics.
- Widening changes amber with +, tightening green with -. Breach red only for a 5Y spread above 200 bps.
- PROXY chip only where `proxy` is true.
- Below the table, a term structure chart for the selected row, with a 200 bps limit line and a "View CVA charge" link.
- Empty state when `rows` is empty.
- Follow the `CvaGrid` pattern for `data-testid` attributes.

Styling:
- Take every colour, font and spacing value from DESIGN.md as CSS variables named after its tokens. No hard-coded hex in the component CSS.
- At the end, list which tokens you used and any value you had to hard-code, with the reason.

Done when: typecheck is clean, a Storybook story (Empty, Populated) renders without console errors, and the component is not wired into App.tsx.

## Result:
Fidelity: the component renders correctly, with one visible divergence. The PROXY chip is slate where the Stitch layout uses cobalt. Claude chose the neutral variant from DESIGN.md over the layout HTML, so design tokens and layout HTML disagreed with each other. Decide which you consider right.
Tokens vs hard-coded: 17 of 18 colours come from tokens. The exceptions are --rating-text (#334155, given only in DESIGN.md’s prose), the 12px panel padding, and the bold weight on breach values. Those are gaps in DESIGN.md, not in Claude’s work.
Screen choice: Claude picked screen 8637484283435303626 on content and said Stitch gives no timestamps. That matches your own finding that nothing marks the latest one.
Retyping: both pulled files were retyped, and both matched your Route A copies apart from whitespace.

## Step 6b: design-system edit in stitch

## Prompt 
What is the breach-red token value?
change it to #EA580C (orange)

## Retro
Propagation is a manual step in the Stitch UI, with no MCP tool for it that I’m aware of.
It rewrites hard-coded hex values in the HTML and doesn’t make it token-driven.
It touched three screens, including screens you didn’t open.
The screen edit changed only the HTML, with hard-coded hex, and DESIGN.md didn’t change.
“Edit with AI” on DESIGN.md created a new screen (3252c79a…) instead of editing 8637…, so anything pinned to the old id never sees it. If your own diff showed the tenor lines or wording drifting, add that.
Regenerating tokens from the new file changed only the 3 expected lines.
Propagating changed the file ids of three desktop screens, including two you didn’t open, but not the mobile ones.
Divergences in Route B’s build: grey PROXY chip vs the layout’s cobalt one, fonts falling back to system fonts, tokens that DESIGN.md gives only in prose.
Setup time and what you had to work out yourself (the official docs wouldn’t load, the key, user scope).

## Route A vs Route B (Module 1c)

Same screen (desktop Credit Spread Dashboard, project 1964730459358180397), same target component. A = `CreditSpreadGrid` from the manual export. B = `CreditSpreadGridB` from the Stitch MCP pull, with tokens generated by `app/artifacts/cva-monitor/scripts/gen-tokens.mjs`.

| Criterion | Route A: manual export | Route B: Stitch MCP |
|---|---|---|
| Fidelity | Renders all rows, 26px rows, breach red on Brazil and Petrobras only. Cobalt PROXY chip matches the layout HTML. Kept the export's fixed 0 to 200 bps axis. | Same rows and rules (22/22 browser checks). PROXY chip is neutral slate: DESIGN.md and the layout HTML disagree and Claude followed DESIGN.md. Axis scales above 200. Inter and JetBrains Mono not loaded (app ships DM Mono only). |
| Tokens vs hard-coded | Tailwind classes translated to plain CSS with local colour variables; hex values written by hand. | 17 of 18 colours come from tokens generated from DESIGN.md; component CSS has no hex. Hard-coded: `--rating-text` (`#334155`, prose only in DESIGN.md), 12px panel padding, bold breach weight. |
| Manual steps | Export HTML and screenshot, copy DESIGN.md by hand, repeat per change. | One-off: create key, `claude mcp add` at user scope. Per pull: pick the right screen, model writes the HTML to disk, run the generator. |
| After a screen edit | Re-export and hand-edit CSS. | Re-pull shows the change in the HTML (red to purple, tint, limit line), but DESIGN.md and so the tokens do not change. |
| After a design-system edit | Re-export, copy DESIGN.md, hand-edit CSS. | "Edit with AI" created a new screen (`3252c79a…`); `8637…` is untouched. Generator on the new file changed exactly 3 lines (header, `breach-red`, `breach-red-bg`). Propagating in the Stitch UI rewrote the hard-coded hex on three desktop screens and gave them new file ids. |
| Setup time | None. | Official docs page rendered blank, so endpoint and auth came from a third-party guide (unverified). Key creation, one registration command, and a fresh session before the tools appeared. |
| Failure modes | Stale snapshot, silent. | Four DESIGN.md screens with no "latest" marker and no timestamp in `list_screens`; HTML returned inline so the model retypes it; edits create new screens or file ids and leave a pinned id stale, silently; screenshot is 1600x1280 where the listing says 2560x2048. |
| Reproducibility | Inputs committed (`design/stitch-export/`). | Input lives in Stitch. Generator and component are committed; the pulled DESIGN.md is not, and the screen id it came from is only recorded in the tokens file header. |

## Retro (Module 1c, summary)
- **MCP removed the copying, not the judgement.** The pull itself worked first time and matched the manual export apart from whitespace. The hard part was knowing which of four DESIGN.md screens to trust, and nothing in the tool output said.
- **Tokens are the part that flows.** A DESIGN.md change reached Route B with one command and a 3-line diff. A screen edit did not, because Stitch writes it as hard-coded hex in the HTML. "The design stays the source of truth" holds only for what is in DESIGN.md.
- **The tools make edits look in place when they are not.** "Edit with AI" made a new screen and propagation changed file ids, so a pipeline pinned to an id goes stale without any error.
- **Pin and record.** Tokens file header names the screen id; the generator fails loudly if it does not find 18 colours and 6 type styles.
- **When I would use each.** Route A when I need a committed, reproducible snapshot, or the tool is not allowed to talk to the design source. Route B when the design system is actively changing and I can pin the screen. At a bank, B also needs InfoSec approval for the key and the outbound connection.
- **Prompt lesson.** Naming the exact screens, asking for files to be read from disk, and requiring a token usage report made the build checkable. Without the report I could not have verified "no hard-coded values".

## Module 7: decisions

**Component: Route B (`CreditSpreadGridB`).** Deciding criteria: 17 of 18 colours come from DESIGN.md tokens via `scripts/gen-tokens.mjs`, so a design-system change is a one-command, 3-line diff; A needs hand-edited hex. Cost accepted: the pulled DESIGN.md depends on Stitch and needs pinning. `CreditSpreadGrid` (A) stays as a reference and Storybook comparison.

**Canonical sources:** Stitch project `1964730459358180397`, screen `8637484283435303626`; DESIGN.md as committed at `design/DESIGN.md` (generator output header names the screen id). Edits in Stitch create new screens, so re-pin before pulling.

| Gap | Decision |
|---|---|
| PROXY chip | Slate, per DESIGN.md. The layout HTML (cobalt) is the stale one. |
| Fonts | Inter and JetBrains Mono now loaded for B. CVA page keeps DM Mono (accepted inconsistency). |
| Chart scale | Axis scales to the data, never below 200 bps; limit line always shown. |