// Reads the pulled DESIGN.md from disk and emits CSS custom properties named after its tokens.
// Usage: node gen-tokens.mjs <DESIGN.md> <out.css> <screen-id>
// Input is the DESIGN.md screen pulled from Stitch via MCP (not committed; the repo copy is design/DESIGN.md).
// Current output: src/CreditSpreadGridB.tokens.css from screen 8637484283435303626.
import { readFileSync, writeFileSync } from 'node:fs';

const [src, out, screenId] = process.argv.slice(2);
const md = readFileSync(src, 'utf8').replace(/\r/g, '');
const fail = (msg) => { throw new Error(`gen-tokens: ${msg}`); };

// Section 2 colour tokens: | `token` | `#HEX` | usage |
const colours = [...md.matchAll(/^\|\s*`([a-z-]+)`\s*\|\s*`(#[0-9A-Fa-f]{6})`\s*\|/gm)].map((m) => [m[1], m[2]]);
if (colours.length !== 18) fail(`expected 18 colour tokens, found ${colours.length}`);

// Section 3 type scale: | `token` | `15px` | `18px` | 700 (Bold) | `0.02em` Uppercase | component |
const types = [...md.matchAll(/^\|\s*`([a-z-]+)`\s*\|\s*`(\d+px)`\s*\|\s*`(\d+px)`\s*\|\s*(\d+)\s*\([^)]*\)\s*\|\s*(?:`(-?[\d.]+em)`[^|]*|Normal)\s*\|/gm)]
  .map((m) => ({ name: m[1], size: m[2], lh: m[3], weight: m[4], tracking: m[5] ?? 'normal' }));
if (types.length !== 6) fail(`expected 6 type-scale rows, found ${types.length}`);

// Font families
const font = (label) => {
  const m = md.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*\`([^\`]+)\``));
  if (!m) fail(`font family not found: ${label}`);
  return m[1];
};
const sans = font('Primary UI Sans');
const mono = font('Quantitative & Data Monospace');

// Section 4 grid rules
const one = (re, what) => { const m = md.match(re); if (!m) fail(`not found: ${what}`); return m[1]; };
const rowHeight = one(/Row Height:\*\* Exact \*\*`(\d+px)`\*\*/, 'row height');
const padX = one(/Horizontal: `(\d+px)`/, 'cell padding x');
const padY = one(/Vertical: `(\d+px)`/, 'cell padding y');
const hover = one(/Hover State:\*\* `background-color: #[0-9A-Fa-f]{6}` on row hover with `([^`]+)`/, 'hover transition');

// Section 6 component rules (prose values, not named tokens)
const chipHeight = one(/Dimensions & Style:\*\* Height `(\d+px)`/, 'proxy chip height');
const ratingText = one(/Typography:\*\* `font-mono text-\[10px\] font-semibold text-\[(#[0-9A-Fa-f]{6})\]/, 'rating text colour');

const lines = [];
lines.push(`/* Generated from DESIGN.md (Stitch screen ${screenId}, project 1964730459358180397).`);
lines.push('   Custom properties are named after the DESIGN.md tokens. Component CSS uses var() only. */');
lines.push('.credit-b {');
lines.push('  /* Section 2: colour tokens */');
for (const [name, hex] of colours) lines.push(`  --${name}: ${hex};`);
lines.push('');
lines.push('  /* Section 3: font families and type scale */');
lines.push(`  --font-primary-ui-sans: ${sans};`);
lines.push(`  --font-quantitative-data-monospace: ${mono};`);
for (const t of types) {
  lines.push(`  --${t.name}-size: ${t.size};`);
  lines.push(`  --${t.name}-line-height: ${t.lh};`);
  lines.push(`  --${t.name}-weight: ${t.weight};`);
  lines.push(`  --${t.name}-tracking: ${t.tracking};`);
}
lines.push('');
lines.push('  /* Section 4: grid, table and row density rules */');
lines.push(`  --row-height: ${rowHeight};`);
lines.push(`  --cell-padding-x: ${padX};`);
lines.push(`  --cell-padding-y: ${padY};`);
lines.push(`  --row-hover-transition: ${hover};`);
lines.push('');
lines.push('  /* Section 6: component values stated in prose, not as named tokens */');
lines.push(`  --proxy-chip-height: ${chipHeight};`);
lines.push(`  --rating-text: ${ratingText};`);
lines.push('}');
writeFileSync(out, lines.join('\n') + '\n', 'utf8');
console.log(`wrote ${out}: ${colours.length} colour tokens, ${types.length} type styles`);
