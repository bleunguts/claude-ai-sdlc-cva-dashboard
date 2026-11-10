import { useState } from 'react';
import './CreditSpreadGridB.tokens.css';
import './CreditSpreadGridB.css';

export interface CreditSpreadRow {
  counterparty: string;
  lei: string;
  rating: string;
  sector: string;
  spread5yBps: number;
  change1dBps: number;
  change5dBps: number;
  proxy: boolean;
  proxyBasis: string | null;
  termStructureBps: Record<string, number>;
  timestamp: string;
}

interface CreditSpreadGridBProps {
  rows: CreditSpreadRow[];
  /** LEI of the selected row. When set, the parent owns selection; otherwise the first row starts selected. */
  selectedLei?: string;
  onSelect?: (row: CreditSpreadRow) => void;
  /** Link target for a row's CVA charge; defaults to "#". */
  cvaHref?: (row: CreditSpreadRow) => string;
}

const BREACH_BPS = 200;
const TENOR_ORDER = ['6M', '1Y', '3Y', '5Y', '7Y', '10Y'];

const columns: { label: string; align: 'left' | 'right' | 'center' }[] = [
  { label: 'Entity', align: 'left' },
  { label: 'Rating', align: 'center' },
  { label: 'Sector', align: 'left' },
  { label: '5Y spread (bps)', align: 'right' },
  { label: '1D change (bps)', align: 'right' },
  { label: '5D change (bps)', align: 'right' },
  { label: 'Proxy', align: 'center' },
  { label: 'CVA', align: 'center' },
];

function formatChange(value: number): string {
  if (value > 0) return `+${value.toFixed(1)}`;
  if (value < 0) return `-${Math.abs(value).toFixed(1)}`;
  return '0.0';
}

function changeClass(value: number): string {
  if (value > 0) return 'credit-b-widening';
  if (value < 0) return 'credit-b-tightening';
  return 'credit-b-flat';
}

function TermStructureChart({ row }: { row: CreditSpreadRow }) {
  const points = TENOR_ORDER.filter((tenor) => tenor in row.termStructureBps).map((tenor) => ({
    tenor,
    bps: row.termStructureBps[tenor],
  }));
  const maxBps = Math.max(BREACH_BPS, ...points.map((point) => point.bps));
  const yMax = Math.ceil(maxBps / 50) * 50;

  const left = 50;
  const right = 880;
  const top = 20;
  const bottom = 140;
  const x = (index: number) => left + ((index + 0.5) * (right - left)) / points.length;
  const y = (bps: number) => bottom - (bps / yMax) * (bottom - top);

  const line = points.map((point, index) => `${x(index)},${y(point.bps)}`).join(' ');
  const gridValues = Array.from({ length: yMax / 50 + 1 }, (_, index) => index * 50);

  return (
    <svg viewBox="0 0 900 156" className="credit-b-chart" role="img" aria-label={`CDS term structure for ${row.counterparty}`}>
      {gridValues.map((value) => (
        <g key={value}>
          <line x1={left} x2={right} y1={y(value)} y2={y(value)} className={value === 0 ? 'credit-b-axis' : 'credit-b-grid'} />
          <text x={left - 6} y={y(value) + 3} textAnchor="end" className="credit-b-tick">{value.toFixed(1)}</text>
        </g>
      ))}
      <line x1={left} x2={right} y1={y(BREACH_BPS)} y2={y(BREACH_BPS)} className="credit-b-limit" />
      <text x={right - 4} y={y(BREACH_BPS) - 4} textAnchor="end" className="credit-b-limit-label">LIMIT BREACH ({BREACH_BPS} bps)</text>
      <polyline points={line} className="credit-b-curve" fill="none" />
      {points.map((point, index) => (
        <g key={point.tenor} className={point.tenor === '5Y' ? 'credit-b-benchmark' : undefined}>
          <circle cx={x(index)} cy={y(point.bps)} r={point.tenor === '5Y' ? 4.5 : 3} className="credit-b-dot" />
          <text x={x(index)} y={y(point.bps) - 9} textAnchor="middle" className="credit-b-value">{point.bps.toFixed(1)}</text>
          <text x={x(index)} y={152} textAnchor="middle" className="credit-b-tenor">{point.tenor}</text>
        </g>
      ))}
    </svg>
  );
}

export function CreditSpreadGridB({ rows, selectedLei, onSelect, cvaHref }: CreditSpreadGridBProps) {
  const [pickedLei, setPickedLei] = useState<string | undefined>();
  const selected = rows.find((row) => row.lei === (selectedLei ?? pickedLei)) ?? rows[0];

  function select(row: CreditSpreadRow) {
    setPickedLei(row.lei);
    onSelect?.(row);
  }

  return (
    <div className="credit-b credit-b-shell">
      <div className="credit-b-table-wrap" data-testid="table-credit-b-rows">
        <table className="credit-b-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.label} className={`credit-b-${column.align}`}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="credit-b-empty" colSpan={columns.length} data-testid="empty-credit-b-results">
                  <span className="credit-b-empty-title">No reference entities to show</span>
                  Credit spreads will appear here once data is available.
                </td>
              </tr>
            ) : rows.map((row) => {
              const breach = row.spread5yBps > BREACH_BPS;
              const isSelected = selected?.lei === row.lei;
              return (
                <tr
                  key={row.lei}
                  data-testid={`row-credit-b-${row.lei}`}
                  className={`${isSelected ? 'is-selected' : ''}${breach ? ' is-breach' : ''}`.trim()}
                >
                  <td className="credit-b-left">
                    <button
                      type="button"
                      className="credit-b-entity"
                      aria-current={isSelected ? 'true' : undefined}
                      onClick={() => select(row)}
                      data-testid={`select-credit-b-${row.lei}`}
                    >
                      {row.counterparty}
                    </button>
                  </td>
                  <td className="credit-b-center"><span className="credit-b-rating">{row.rating}</span></td>
                  <td className="credit-b-left credit-b-sector">{row.sector}</td>
                  <td className={`credit-b-right credit-b-num credit-b-spread${breach ? ' is-breach-value' : ''}`}>{row.spread5yBps.toFixed(1)}</td>
                  <td className={`credit-b-right credit-b-num ${changeClass(row.change1dBps)}`}>{formatChange(row.change1dBps)}</td>
                  <td className={`credit-b-right credit-b-num ${changeClass(row.change5dBps)}`}>{formatChange(row.change5dBps)}</td>
                  <td className="credit-b-center">
                    {row.proxy
                      ? <span className="credit-b-proxy" title={row.proxyBasis ?? undefined} data-testid={`proxy-credit-b-${row.lei}`}>PROXY</span>
                      : <span className="credit-b-dash">—</span>}
                  </td>
                  <td className="credit-b-center">
                    <a className="credit-b-link" href={cvaHref?.(row) ?? '#'} data-testid={`link-cva-b-${row.lei}`}>CVA</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <section className="credit-b-term" data-testid="credit-b-term-structure">
          <header className="credit-b-term-head">
            <span className="credit-b-term-title">Term structure — {selected.counterparty}</span>
            <a className="credit-b-link credit-b-term-link" href={cvaHref?.(selected) ?? '#'} data-testid="link-cva-charge-b">View CVA charge →</a>
          </header>
          <TermStructureChart row={selected} />
        </section>
      )}
    </div>
  );
}
