import { useState } from 'react';
import { Search } from 'lucide-react';
import mockRows from './data/mock-data.json';
import { CvaGrid, type CvaRow } from './CvaGrid';

const rows = mockRows as CvaRow[];
const buckets = ['All', 'G-SIBs', 'Sovereigns', 'Corporates', 'Commodities'];
const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function App() {
  const [counterpartySearch, setCounterpartySearch] = useState('');
  const [bucket, setBucket] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const query = counterpartySearch.trim().toLocaleLowerCase();
  const filteredRows = rows.filter((row) => {
    const rowDate = row.timestamp.slice(0, 10);
    const matchesCounterparty = !query || row.counterparty.toLocaleLowerCase().includes(query);
    const matchesBucket = bucket === 'All' || row.bucket === bucket;
    const matchesFrom = !dateFrom || rowDate >= dateFrom;
    const matchesTo = !dateTo || rowDate <= dateTo;
    return matchesCounterparty && matchesBucket && matchesFrom && matchesTo;
  });

  const filteredTotal = filteredRows.reduce((total, row) => total + (row.cvaCharge ?? 0), 0);

  return (
    <main className="terminal">
      <div className="terminal-inner">
        <header className="titlebar">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true">CV</div>
            <div>
              <div className="eyebrow">Counterparty risk / valuation</div>
              <h1 className="page-title">CVA by Counterparty</h1>
            </div>
          </div>
          <div className="market-state"><span className="live-dot" />Snapshot · 06 Oct 2026 · UTC</div>
        </header>

        <section className="filters" aria-label="Filter counterparties">
          <label className="filter-field search-field">
            <span className="filter-label">Counterparty search</span>
            <span className="control-wrap">
              <Search className="control-icon" aria-hidden="true" />
              <input
                className="control search-control"
                type="search"
                placeholder="Search counterparty name"
                value={counterpartySearch}
                data-active={counterpartySearch.trim() ? 'true' : undefined}
                onChange={(event) => setCounterpartySearch(event.target.value)}
                data-testid="input-counterparty-search"
              />
            </span>
          </label>
          <label className="filter-field">
            <span className="filter-label">Risk bucket</span>
            <select className="control" value={bucket} data-active={bucket !== 'All' ? 'true' : undefined} onChange={(event) => setBucket(event.target.value)} data-testid="select-risk-bucket">
              {buckets.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className="filter-field">
            <span className="filter-label">Timestamp from</span>
            <input className="control date-control" type="date" value={dateFrom} data-active={dateFrom ? 'true' : undefined} onChange={(event) => setDateFrom(event.target.value)} data-testid="input-date-from" />
          </label>
          <label className="filter-field">
            <span className="filter-label">Timestamp to</span>
            <input className="control date-control" type="date" value={dateTo} data-active={dateTo ? 'true' : undefined} onChange={(event) => setDateTo(event.target.value)} data-testid="input-date-to" />
          </label>
        </section>

        <div className="statusline" role="status" data-testid="status-filtered-summary">
          <span><strong>{filteredRows.length}</strong> of {rows.length} counterparties</span>
          <span>Filtered CVA total <strong className="status-total">{money.format(filteredTotal)}</strong></span>
        </div>

        <CvaGrid rows={filteredRows} />
        <div className="table-footnote">
          <span>Amounts in USD · CDS spreads in basis points</span>
          <span>Source snapshot · 06 Oct 2026</span>
        </div>
      </div>
    </main>
  );
}

export default App;
