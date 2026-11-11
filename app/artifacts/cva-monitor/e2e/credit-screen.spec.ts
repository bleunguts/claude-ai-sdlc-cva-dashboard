import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Expectations are derived from the mock JSON, not hand-typed.
// Playwright runs from the app folder, so this path is relative to it.
const credit: { counterparty: string; lei: string; spread5yBps: number; proxy: boolean }[] = JSON.parse(
  readFileSync('src/data/mock-credit.json', 'utf-8'),
);
const breachLeis = credit.filter((r) => r.spread5yBps > 200).map((r) => r.lei);
const proxyLeis = credit.filter((r) => r.proxy).map((r) => r.lei);

test('credit screen flags breach rows and PROXY chips from the data', async ({ page }) => {
  await page.goto('/');

  // All rows render
  await expect(page.getByTestId('table-credit-b-rows').locator('tbody tr')).toHaveCount(credit.length);

  for (const row of credit) {
    // Breach styling only on rows above the 200 bps limit
    const tr = page.getByTestId(`row-credit-b-${row.lei}`);
    if (breachLeis.includes(row.lei)) await expect(tr).toHaveClass(/is-breach/);
    else await expect(tr).not.toHaveClass(/is-breach/);

    // PROXY chip only on proxy entities
    await expect(page.getByTestId(`proxy-credit-b-${row.lei}`)).toHaveCount(proxyLeis.includes(row.lei) ? 1 : 0);
  }

  // Guard against the loop passing vacuously if the data changes
  expect(breachLeis).toHaveLength(2);
  expect(proxyLeis).toHaveLength(2);
});
