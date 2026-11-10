---
name: Apex Risk Terminal
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#006e2d'
  on-secondary: '#ffffff'
  secondary-container: '#7cf994'
  on-secondary-container: '#007230'
  tertiary: '#8f000b'
  on-tertiary: '#ffffff'
  tertiary-container: '#bb0112'
  on-tertiary-container: '#ffc7c1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#7ffc97'
  secondary-fixed-dim: '#62df7d'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005320'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ab'
  on-tertiary-fixed: '#410002'
  on-tertiary-fixed-variant: '#93000b'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  body-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  body-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
  data-mono-primary:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: -0.02em
  data-mono-alert:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: -0.02em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.04em
  table-header:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.5rem
  margin: 0.75rem
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.375rem
  space-md: 0.5rem
  space-lg: 0.75rem
  space-xl: 1rem
---

## Brand & Style

This design system establishes an institutional financial desk aesthetic calibrated for quantitative risk officers, credit analysts, and trading desk monitors. Rather than emulating consumer SaaS trends, it draws direct heritage from mission-critical financial interfaces like Bloomberg Professional, FactSet, and LSEG Eikon. The visual hierarchy favors precision, structural legibility, and high-frequency analytical workflows over decorative whitespace.

The emotional signature is rigorous, authoritative, and stable under volatile market conditions. Layout structures prioritize compact density (26px table rows, hairline borders, compact controls), allowing analysts to observe hundreds of counterparty credit valuation adjustments (CVA), credit default swap (CDS) spreads, and Monte Carlo engine statuses without vertical exhaustion or excessive scrolling. Visual embellishments are minimized; flat structural geometry and low-contrast borders maintain clear containment.

## Colors

The palette reproduces the disciplined environment of a Tier-1 trading and risk management floor.

- **Background & Canvas:** Crisp institutional base surfaces (`#FFFFFF` for primary workbenches and data tables, `#F8FAFC` for page hulls, fixed utility rails, and secondary headers). Micro-separators and grid lines rely on `#E2E8F0` and `#EDF2F7` for crisp border demarcation.
- **Primary Brand Cobalt (`#1D4ED8`):** Reserved for deliberate interactive states, primary action buttons, active navigation rails, and current workspace pills.
- **Engine & System Green (`#16A34A`):** Indicates live market telemetry, engine sync, and nominal service health.
- **Strict Limit Breach Red (`#DC2626`):** **Strict Rule:** Red must never appear in decorative icons, logo accents, or general brand touchpoints. It is exclusively dedicated to risk breaches, threshold overruns (e.g., CDS spreads > 200bps, CVA aggregate spikes > $1.5M), and system fault states.
- **Institutional Typographic Slate:** `#0F172A` provides high-contrast legibility for primary counterparty names and key metrics; `#475569` handles metadata, LEI codes, and secondary labels; `#94A3B8` anchors inactive timestamps and structural borders.

## Typography

The typography system pairs **Inter** for dense UI navigation and structural labeling with **JetBrains Mono** for financial data and telemetry.

- **Numerics & Quantitative Fields:** All spreads (bps), CVA charges ($), VaR figures, timestamps, tenors, and LEI identifiers must be rendered in `JetBrains Mono` with tabular numbers enabled (`tnum`, `zero`). This ensures vertical column alignment down the 26px grid and prevents layout jitter during live streaming ticks.
- **Labels & Headers:** Data grid headers use uppercase styling with letter-spacing (`0.06em`) to ensure scanability across columns. Counterparty titles retain condensed Inter formatting to fit elongated institutional entity names without truncation.

## Layout & Spacing

The terminal is designed around a zero-dead-space fixed shell layout:
- **Telemetry Top Ribbon:** 32px height, anchored to the top viewport edge. Houses real-time simulation latencies, EOD timestamps, and key portfolio aggregations (`Agg CVA`, `VaR (99%)`).
- **Workspace Header:** 44px height containing application identity, global search context, counterparty filtering, and critical trigger actions (`Recalculate`, `Export`).
- **Navigation Dock:** Left-aligned 180px–220px fixed vertical bar containing high-level analytics modules (CVA Sensitivity, Counterparty Limits, Monte Carlo Engines). Includes a persistent bottom cluster for engine node health and round-trip ping.
- **Data Canvas:** High-density, multi-column grid filling 100% of remaining horizontal and vertical space. Table rows conform strictly to a **26px row height** budget (`padding: 3px 8px`).
- **Responsive Adaptability:** On lower desktop viewports (1280px–1440px), the left rail collapses to an icon-only dock (48px) to protect data grid horizontal clearance and eliminate horizontal scrolling on standard 10-column financial matrices.

## Elevation & Depth

This system avoids soft consumer drop shadows, diffused lighting, and neomorphic bevels. Depth is achieved purely through **structural surface tiering and 1px crisp borders**:

- **Tier 0 (Canvas Base):** `#F8FAFC` foundation for the viewport perimeter and shell rails.
- **Tier 1 (Data Surfaces & Tables):** `#FFFFFF` cards, floating filters, and table containers encased in a solid `1px solid #E2E8F0` border.
- **Grid Dividers:** Table rows are bounded by a hairline `1px solid #EDF2F7` horizontal rule. Column dividing lines use subtle `1px solid #F1F5F9` borders to facilitate rapid visual tracking down numeric columns.
- **Active & Focused Modals:** For calculation drill-downs and column configurators, elevation uses a hard architectural shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)` combined with a sharp `#CBD5E1` border.

## Shapes

The design system employs a **Soft (0.25rem / 4px base)** geometry. Financial terminals require tight component bounding to preserve compact layout alignment:
- **Default interactive elements (buttons, inputs, select triggers):** `rounded` (2px to 4px).
- **Table Cells & Row Highlights:** `0px` radius (completely flat) to preserve continuity down grid lines.
- **Filter Pills & Status Indicators:** `4px` maximum radius. Full pill geometries (rounded-full) are restricted strictly to telemetry status pills and operational counts to distinguish them from standard inputs.

## Components

### Data Tables (The Primary Component)
- **Row Height:** Strict 26px row height.
- **Zebra & Hover:** Alternate rows switch between `#FFFFFF` and `#FAFBFD`. On row hover, shift background to `#F1F5F9` with an instantaneous 0ms transition.
- **Numeric Columns:** All spreads, charges, and tenors must be right-aligned with monospace font declarations (`font-variant-numeric: tabular-nums`).
- **Alert Inset:** Rows containing a breach (e.g. CDS > 200 bps or CVA > $1.5M) apply `#DC2626` font color directly to the breaching metric value.

### Data Table Column Headers
- **Height & Style:** 24px height, `#F8FAFC` surface, uppercase typography with subtle directional sort arrows (`▲`/`▼`) in `#94A3B8`.
- **Borders:** `border-b: 1px solid #CBD5E1`.

### Top Telemetry Bar
- Flat 32px bar with horizontal pipeline indicators.
- **Status Dot:** 6px circular dot `#16A34A` with subtle ping animation for live data feeds; transitions to `#DC2626` for engine stall or disconnect.

### Buttons & Workspace Actions
- **Primary Recalculate:** `#1D4ED8` background, white text, 24px height, 8px horizontal padding, bold 11px Inter font.
- **Secondary / Export:** Outlined button (`1px solid #CBD5E1`), `#FFFFFF` background, `#0F172A` text, hover state `#F1F5F9`.

### Filter Chips & Quick-Toggles
- 20px height, 6px horizontal padding. Active filter: `#1D4ED8` with white text. Inactive filter: `#F1F5F9` with `#475569` text and `#E2E8F0` border. Number counts in parentheses rendered in monospace.

### Inputs & Search
- 24px compact input height, integrated search icon (`#94A3B8`), `#FFFFFF` background, `1px solid #CBD5E1` border, focusing to `1px solid #1D4ED8` without soft glow. Placeholder text in `#94A3B8` monospace.