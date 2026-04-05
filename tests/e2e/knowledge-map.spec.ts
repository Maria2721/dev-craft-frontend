import { expect, test } from '@playwright/test';

test.describe('Knowledge map', () => {
  test('shows heading and React Flow after topics load', async ({ page }) => {
    await page.goto('/map');

    await expect(page.getByRole('heading', { name: 'Knowledge Map' })).toBeVisible();

    await expect(page.locator('.react-flow')).toBeVisible({ timeout: 60_000 });
  });
});
