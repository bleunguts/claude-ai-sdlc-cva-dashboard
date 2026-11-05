import {test, expect} from '@playwright/test';

test('filtering by counterparty name narrows the table', async ({ page }) => {
    await page.goto('/');

    // 1. Full table loaded
    await expect(page.getByTestId('status-filtered-summary')).toContainText('20 of 20');

    // 2. Filter by counterparty name
    await page.getByTestId('input-counterparty-search').fill('group');

    // 3. Summary updates
    await expect(page.getByTestId('status-filtered-summary')).toContainText('4 of 20');

    // 4. Matching rows present
    for (const lei of [
        '37E3P3E2Z8IQ9Y7JZB6C', // Goldman Sachs Group
        'VLSI47WQAL9VQ24ZKLMV', // UBS Group
        'T45HU43JSIOM1TMA7V3D', // Citigroup
        '7OCUBRL5PTP5AA819T9U', // Trafigura Group
    ]) {
        await expect(page.getByTestId(`row-counterparty-${lei}`)).toBeVisible();
    }

    // 5. Non-matching rows not present
    await expect(page.getByTestId('row-counterparty-549300VYZUK7S707I053')).toHaveCount(0); // BNP Paribas
});