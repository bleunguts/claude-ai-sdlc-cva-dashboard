import { CreditSpreadGridB, type CreditSpreadRow } from '../CreditSpreadGridB';
import creditData from '../data/mock-credit.json';

const rows = creditData as CreditSpreadRow[];

export default function CreditSpreads() {
  return (
    <main className="terminal">
      <div className="terminal-inner">
        <CreditSpreadGridB
          rows={rows}
          cvaHref={(row) => `/cva?counterparty=${encodeURIComponent(row.counterparty)}`}
        />
      </div>
    </main>
  );
}
