import { Link } from 'wouter';
import cvaData from '../data/mock-data.json';
import creditData from '../data/mock-credit.json';

// TACTICAL STUB for #34: plain mock fields, no Stitch design.
export default function Counterparty({ lei }: { lei: string }) {
  const cva = cvaData.find((r) => r.lei === lei);
  const credit = creditData.find((r) => r.lei === lei);

  if (!cva && !credit) {
    return <main className="terminal" data-testid="counterparty-stub">Unknown counterparty: {lei}</main>;
  }

  return (
    <main className="terminal" data-testid="counterparty-stub">
      <div className="terminal-inner">
        <h1 className="page-title">{cva?.counterparty ?? credit?.counterparty}</h1>
        <dl>
          <dt>LEI</dt><dd>{lei}</dd>
          <dt>Bucket</dt><dd>{cva?.bucket ?? '—'}</dd>
          <dt>Rating</dt><dd>{credit?.rating ?? '—'}</dd>
          <dt>5Y spread (bps)</dt><dd>{credit?.spread5yBps.toFixed(1) ?? '—'}</dd>
          <dt>CVA charge (USD)</dt><dd>{cva?.cvaCharge?.toLocaleString('en-US') ?? '—'}</dd>
        </dl>
        <Link href="/cva">← Back to CVA monitor</Link>
      </div>
    </main>
  );
}