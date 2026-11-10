# DESIGN.md — Apex Risk Terminal Design System

Institutional trading and risk management design system engineered for high-density financial analytics, counterparty credit valuation (CVA), and real-time market data monitoring.

---

## 1. Visual Philosophy & Density Principles
- **Terminal Density over Consumer SaaS:** Maximum information throughput, zero decorative chrome, zero redundant telemetry ribbons.
- **Layout Architecture:** Eliminated left navigation dock, top telemetry ribbons, aggregate CVA/VaR metrics, and engine health nodes. The layout consists strictly of a **slim workspace header** (search, filtering, batch actions) and the **full-width dense data canvas**.
- **Strict Row Density:** Baseline table rows are locked to **26px height** (`h-[26px]` / `min-h-[26px]`).
- **Functional Semantics Only:** Color is strictly informational, operational, or state-reporting. No decorative tinting or Material Design multi-container abstractions.

---

## 2. Unified Color Palette (Hex Tokens)

Single unified institutional palette matching core terminal specifications:

### Surfaces & Backgrounds
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `surface-base` | `#F8FAFC` | Terminal workspace canvas backdrop |
| `surface-container` | `#FFFFFF` | Table cells, data rows, active containers |
| `surface-subtle` | `#F1F5F9` | Table header row, inactive filter chips, rating chip background |
| `surface-border` | `#E2E8F0` | Dense grid horizontal and vertical borders |
| `surface-border-subtle` | `#CBD5E1` | Input focus rings, divider lines, filter outlines |

### Typography & Neutrals
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `text-primary` | `#0F172A` | Counterparty names, column headers, standard figures |
| `text-secondary` | `#475569` | LEIs, ratings, inactive labels, metric subtitles |
| `text-muted` | `#64748B` | Timestamps, search placeholders, proxy labels |
| `text-inverse` | `#FFFFFF` | Text on active brand buttons and selected filters |

### Primary Accent & Controls
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `accent-primary` | `#1D4ED8` | Institutional cobalt: primary buttons, active filter chips, table selection |
| `accent-hover` | `#1E40AF` | Hover state for cobalt triggers and buttons |
| `accent-subtle` | `#EFF6FF` | Row hover highlight, selected filter chip background |

### Status, Delta & Operational Color Rules
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `telemetry-green` | `#16A34A` | System status dot, tightening spread indicator (`-bps`), live heartbeat |
| `telemetry-green-bg` | `#DCFCE7` | Subtle green background for tightening delta badge |
| `spread-widening` | `#D97706` | Amber/warning for spread widening (`+bps`) without triggering breach red |
| `spread-widening-bg`| `#FEF3C7` | Subtle amber tint for spread widening badge |
| `breach-red` | `#DC2626` | **Strict Breach Only**: CDS > 200.0 bps OR CVA > $5,000,000 |
| `breach-red-bg` | `#FEF2F2` | Subtle cell/row alert tint for breach states |

---

## 3. Typography & Font Families

### Font Families
- **Primary UI Sans:** `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Used for: Workspace headers, counterparty entity names, column titles, filter tabs, button labels.
- **Quantitative & Data Monospace:** `"JetBrains Mono", "SF Mono", "Roboto Mono", Menlo, Consolas, monospace`
  - Used for: Numerical data, CDS spreads, basis point deltas, CVA charges, tenors, ratings, LEIs, timestamps.
  - Required CSS properties: `font-feature-settings: "tnum" on, "zero" on; font-variant-numeric: tabular-nums;`

### Type Scale
| Token | Size | Line Height | Weight | Tracking / Case | Component |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `title-md` | `15px` | `18px` | 700 (Bold) | `0.02em` Uppercase | Slim header title (`COUNTERPARTY CVA & CDS`) |
| `body-header` | `11px` | `14px` | 600 (SemiBold)| `0.04em` Uppercase | Table column headers (`COUNTERPARTY`, `RATING`, `CDS 5Y`) |
| `body-data` | `12px` | `16px` | 500 (Medium) | Normal | Counterparty entity name |
| `mono-data` | `11px` | `14px` | 600 (SemiBold)| Normal | CDS spreads, CVA net charges, tenors, spread deltas |
| `mono-subtle` | `10px` | `13px` | 400 (Regular) | `0.02em` | LEI identifiers, UTC timestamps, rating badges |
| `chip-text` | `9px` | `11px` | 700 (Bold) | `0.05em` Uppercase | Proxy-flag chip, filter tags |

---

## 4. Grid, Table & Row Density Rules

- **Row Height:** Exact **`26px`** baseline height (`h-[26px]` / `min-h-[26px]`).
- **Cell Padding:** 
  - Horizontal: `8px` (`px-2`)
  - Vertical: `2px` (`py-0.5`)
- **Border Treatment:** `1px solid #E2E8F0` on all horizontal table dividers; light vertical column dividers (`#E2E8F0`).
- **Hover State:** `background-color: #EFF6FF` on row hover with `100ms ease` transition.
- **Data Canvas:** Direct full-width data grid without sidebar margin, utilizing virtual scrolling for institutional counterparty volumes.

---

## 5. Numeric Formatting & Column Standards

1. **Right-Alignment Obligation:**
   - Quantitative columns (`CDS 5Y`, `SPREAD Δ (BPS)`, `NET CVA CHARGE`, `TIMESTAMP`, `TENOR`) **must be right-aligned** (`text-right`).
   - Counterparty name and LEI are left-aligned (`text-left`).
   - Rating and Proxy-flag columns are centered (`text-center`).
2. **Tabular Numerals (`tabular-nums`):**
   - Enforce equal character width across all digits (0–9) ensuring decimal alignment.
3. **Number Precision:**
   - **CVA Charges:** USD formatted with thousand separators and integer precision: `+$4,120,450`, `+$5,480,300`.
   - **CDS Spreads:** Fixed 1-decimal basis points: `64.2`, `215.0`, `112.4`.
   - **Spread Deltas:** Explicit sign and 1-decimal basis points: `+4.5`, `-2.1`, `0.0`.

---

## 6. Specific Component & Data Rules

### A. Spread Change in Basis Points (Widening vs. Tightening)
- **Constraint:** Breach Red (`#DC2626`) is strictly prohibited for standard spread deltas.
- **Widening (+bps / credit deterioration):** Displayed in Amber (`#D97706`) with prefix `+` (e.g. `+5.4 bps`).
- **Tightening (-bps / credit improvement):** Displayed in Green (`#16A34A`) with prefix `-` (e.g. `-3.2 bps`).
- **Unchanged (0.0 bps):** Neutral Slate (`#64748B`).

### B. Proxy-Flag Chip
- For counterparties where direct CDS contracts are illiquid and pricing is derived via sector/rating curve proxies:
  - Display a compact micro-chip labeled **`PROXY`** or **`MAP`**.
  - **Dimensions & Style:** Height `14px`, padding `px-1`, font-size `9px`, `font-mono font-bold tracking-wider`, rounded `2px`.
  - **Color:** Neutral Slate (`bg-[#F1F5F9]`, text `#475569`, border `1px solid #CBD5E1`), or subtle Cobalt outline (`text-[#1D4ED8] bg-[#EFF6FF] border-[#BFDBFE]`).

### C. Credit Rating Column
- **Format:** Internal/Agency notch (e.g., `Aa2 / AA`, `Baa1 / BBB+`, `Ba3 / BB-`).
- **Typography:** `font-mono text-[10px] font-semibold text-[#334155] text-center`.
- **Treatment:** Displayed within a minimal neutral pill (`bg-[#F1F5F9] px-1.5 py-0.5 rounded-[2px] border border-[#E2E8F0]`).

### D. Term Structure Chart Line Colours
For multi-tenor CDS curves (6M, 1Y, 2Y, 3Y, 5Y, 7Y, 10Y, 30Y) plotted within term structure drawer/sparkline views:
- **Active / Benchmark Curve (5Y):** Cobalt Blue `#1D4ED8` (solid 1.5px line).
- **Secondary Tenors (1Y / 3Y):** Slate Gray `#64748B` (1px line, 70% opacity).
- **Long Tenors (10Y / 30Y):** Dark Navy `#0F172A` (1px line, 85% opacity).
- **Proxy Curve Comparison:** Cobalt dashed line `#1D4ED8` (`stroke-dasharray: 3, 3`).
- **Historical EOD Baseline:** Muted Slate `#94A3B8` (dotted 1px line).
- **Breach Threshold Line:** Horizontal alert line in `#DC2626` (1px dashed at 200 bps).

---

## 7. Revised Breach Rules & Risk Thresholds

1. **Breach Red Exclusivity (`#DC2626`):**
   - Strictly applies **only** when:
     - **CDS 5Y Spread > 200.0 bps**
     - **Net CVA Charge > $5,000,000** (updated from prior $1.5M threshold)
   - When a row breaches either limit:
     - The breaching metric displays in bold red (`text-[#DC2626] font-bold font-mono`).
     - The table row receives an alert tint: `background-color: #FEF2F2`.
2. **Prohibited Red Uses:**
   - Never use `#DC2626` for spread widening (+bps), negative portfolio deltas within policy, error states, or button hover states.
