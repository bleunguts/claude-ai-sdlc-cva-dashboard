import { useMemo, useState } from 'react';

export interface CvaRow {
  counterparty: string;
  lei: string;
  bucket: string;
  cdsSpreadBps: number | null;
  tenor: string;
  cvaCharge: number | null;
  timestamp: string;
}

type SortKey = keyof CvaRow;
type SortDirection = 'asc' | 'desc';

interface CvaGridProps {
  rows: CvaRow[];
}

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const timestampFormat = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
  timeZone: 'UTC',
});

const columns: { key: SortKey; label: string; numeric?: boolean; className?: string }[] = [
  { key: 'counterparty', label: 'Counterparty' },
  { key: 'bucket', label: 'Bucket' },
  { key: 'cdsSpreadBps', label: 'CDS spread (bps)', numeric: true },
  { key: 'tenor', label: 'Tenor', numeric: true },
  { key: 'cvaCharge', label: 'CVA charge', numeric: true },
  { key: 'timestamp', label: 'Timestamp', numeric: true },
];

function compareValues(a: CvaRow[SortKey], b: CvaRow[SortKey]): number {
  if (a === null || b === null) {
    if (a === b) return 0;
    return a === null ? 1 : -1;
  }
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return `${timestampFormat.format(date)} UTC`;
}

export function CvaGrid({ rows }: CvaGridProps) {
  const [sortKey, setSortKey] = useState<SortKey>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedRows = useMemo(() => {
    return [...rows].sort((left, right) => {
      const comparison = compareValues(left[sortKey], right[sortKey]);
      if (comparison === 0) return left.counterparty.localeCompare(right.counterparty);
      if (left[sortKey] === null || right[sortKey] === null) return comparison;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [rows, sortDirection, sortKey]);

  function selectSort(key: SortKey) {
    if (sortKey === key) setSortDirection((current) => current === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortDirection('asc');
    }
  }

  return (
    <div className="grid-shell" data-testid="table-cva-rows">
      <table className="cva-table">
        <colgroup>
          <col style={{ width: '34%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '9%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.numeric ? 'num-head' : undefined} aria-sort={sortKey === column.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                <button
                  type="button"
                  className="sort-button"
                  onClick={() => selectSort(column.key)}
                  data-testid={`sort-${column.key}`}
                  aria-label={`Sort by ${column.label}${sortKey === column.key ? `, ${sortDirection === 'asc' ? 'ascending' : 'descending'}` : ''}`}
                >
                  {column.label}
                  <span className="sort-indicator" aria-hidden="true">
                    {sortKey === column.key ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr>
              <td className="empty-cell" colSpan={6} data-testid="empty-filter-results">
                <span className="empty-title">No counterparties match these filters</span>
                Adjust the search or date range to see exposures.
              </td>
            </tr>
          ) : sortedRows.map((row) => (
            <tr key={`${row.lei}-${row.timestamp}`} data-testid={`row-counterparty-${row.lei}`}>
              <td className="counterparty-cell" title={row.counterparty}>
                {row.counterparty}<span className="lei">{row.lei}</span>
              </td>
              <td className="bucket-cell">{row.bucket}</td>
              <td className="numeric spread">{row.cdsSpreadBps === null ? '—' : row.cdsSpreadBps.toFixed(1)}</td>
              <td className="numeric">{row.tenor}</td>
              <td className="numeric charge">{row.cvaCharge === null ? '—' : money.format(row.cvaCharge)}</td>
              <td className="numeric timestamp">{formatTimestamp(row.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
