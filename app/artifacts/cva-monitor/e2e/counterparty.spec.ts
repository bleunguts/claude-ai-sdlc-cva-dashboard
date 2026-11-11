import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const cva: { counterparty: string; lei: string; cvaCharge: number | null }[] = JSON.parse(
  readFileSync('src/data/mock-data.json', 'utf-8'),
);
const target = cva.find((r) => r.counterparty.startsWith('Deutsche'))!;

test('CVA monitor row links to the counterparty stub', async ({ page }) => {
  await page.goto('/cva');
  await page.getByTestId(`link-detail-${target.lei}`).click();

  const stub = page.getByTestId('counterparty-stub');
  await expect(stub).toContainText(target.counterparty);
  await expect(stub).toContainText(target.lei);
  await expect(stub).toContainText(target.cvaCharge!.toLocaleString('en-US'));
});