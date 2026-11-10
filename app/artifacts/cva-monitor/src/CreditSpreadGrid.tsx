import { useState } from 'react';
import './CreditSpreadGrid.css';

export interface CreditRow {
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

interface CreditSpreadGridProps {
  rows: CreditRow[];
  /** LEI of the initially selected row; defaults to the first row. */
  selectedLei?: string;
  onSelect?: (row: CreditRow) => void;
  /** Link target for a row's CVA charge; defaults to "#". */
  cvaHref?: (row: CreditRow) => string;
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
  if (value > 0) return 'credit-widening';
  if (value < 0) return 'credit-tightening';
  return 'credit-flat';
}

function TermStructureChart({ row }: { row: CreditRow }) {
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
    <svg viewBox="0 0 900 156" className="credit-chart" role="img" aria-label={`CDS term structure for ${row.counterparty}`}>
      {gridValues.map((value) => (
        <g key={value}>
          <line x1={left} x2={right} y1={y(value)} y2={y(value)} className={value === 0 ? 'chart-axis' : 'chart-grid'} />
          <text x={left - 6} y={y(value) + 3} textAnchor="end" className="chart-tick">{value.toFixed(1)}</text>
        </g>
      ))}
      <line x1={left} x2={right} y1={y(BREACH_BPS)} y2={y(BREACH_BPS)} className="chart-limit" />
      <text x={right - 4} y={y(BREACH_BPS) - 4} textAnchor="end" className="chart-limit-label">LIMIT {BREACH_BPS} bps</text>
      <polyline points={line} className="chart-curve" fill="none" />
      {points.map((point, index) => (
        <g key={point.tenor} className={point.tenor === '5Y' ? 'chart-benchmark' : undefined}>
          <circle cx={x(index)} cy={y(point.bps)} r={point.tenor === '5Y' ? 4.5 : 3} className="chart-dot" />
          <text x={x(index)} y={y(point.bps) - 9} textAnchor="middle" className="chart-value">{point.bps.toFixed(1)}</text>
          <text x={x(index)} y={152} textAnchor="middle" className="chart-tenor">{point.tenor}</text>
        </g>
      ))}
    </svg>
  );
}

export function CreditSpreadGrid({ rows, selectedLei, onSelect, cvaHref }: CreditSpreadGridProps) {
  const [activeLei, setActiveLei] = useState<string | undefined>(selectedLei ?? rows[0]?.lei);
  const selected = rows.find((row) => row.lei === activeLei) ?? rows[0];

  function select(row: CreditRow) {
    setActiveLei(row.lei);
    onSelect?.(row);
  }

  return (
    <div className="credit-shell">
      <div className="credit-table-wrap" data-testid="table-credit-rows">
        <table className="credit-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.label} className={`align-${column.align}`}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="credit-empty" colSpan={columns.length} data-testid="empty-credit-results">
                  <span className="credit-empty-title">No reference entities to show</span>
                  Credit spreads will appear here once data is available.
                </td>
              </tr>
            ) : rows.map((row) => {
              const breach = row.spread5yBps > BREACH_BPS;
              const isSelected = selected?.lei === row.lei;
              return (
                <tr
                  key={row.lei}
                  data-testid={`row-credit-${row.lei}`}
                  aria-selected={isSelected}
                  className={`${isSelected ? 'is-selected' : ''}${breach ? ' is-breach' : ''}`.trim()}
                >
                  <td className="align-left">
                    <button type="button" className="credit-entity" onClick={() => select(row)} data-testid={`select-credit-${row.lei}`}>
                      {row.counterparty}
                    </button>
                  </td>
                  <td className="align-center"><span className="credit-rating">{row.rating}</span></td>
                  <td className="align-left credit-sector">{row.sector}</td>
                  <td className={`align-right credit-num credit-spread${breach ? ' threshold-alert' : ''}`}>{row.spread5yBps.toFixed(1)}</td>
                  <td className={`align-right credit-num ${changeClass(row.change1dBps)}`}>{formatChange(row.change1dBps)}</td>
                  <td className={`align-right credit-num ${changeClass(row.change5dBps)}`}>{formatChange(row.change5dBps)}</td>
                  <td className="align-center">
                    {row.proxy
                      ? <span className="credit-proxy" title={row.proxyBasis ?? undefined} data-testid={`proxy-${row.lei}`}>PROXY</span>
                      : <span className="credit-dash">—</span>}
                  </td>
                  <td className="align-center">
                    <a className="credit-link" href={cvaHref?.(row) ?? '#'} data-testid={`link-cva-${row.lei}`}>CVA</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <section className="credit-term" data-testid="credit-term-structure">
          <header className="credit-term-head">
            <span className="credit-term-title">Term structure — {selected.counterparty}</span>
            <a className="credit-link" href={cvaHref?.(selected) ?? '#'}>View CVA charge →</a>
          </header>
          <TermStructureChart row={selected} />
        </section>
      )}
    </div>
  );
}
