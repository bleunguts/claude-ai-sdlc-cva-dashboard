import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Expectations come from the mock JSON, not hand-typed values.
// Playwright runs from the app folder, so this path is relative to it.
const credit: { counterparty: string; lei: string }[] = JSON.parse(
  readFileSync('src/data/mock-credit.json', 'utf-8'),
);
const target = credit.find((r) => r.counterparty.startsWith('Deutsche'))!;

test('CVA link on the credit screen opens the CVA monitor filtered to that counterparty', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId(`link-cva-b-${target.lei}`).click();

  await expect(page.getByTestId('input-counterparty-search')).toHaveValue(target.counterparty);
  await expect(page.getByTestId('status-filtered-summary')).toContainText('1 of 20');
  await expect(page.getByTestId(`row-counterparty-${target.lei}`)).toBeVisible();
});

test('View CVA charge link follows the selected row', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId(`select-credit-b-${target.lei}`).click();
  await page.getByTestId('link-cva-charge-b').click();

  await expect(page.getByTestId('input-counterparty-search')).toHaveValue(target.counterparty);
  await expect(page.getByTestId('status-filtered-summary')).toContainText('1 of 20');
});