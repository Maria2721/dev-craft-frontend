import { expect, test } from '@playwright/test';

import { loginAsTestUser } from './helpers/login';

test.describe('Email login', () => {
  test('logs in, opens the map, and reaches profile', async ({ page }) => {
    await loginAsTestUser(page);

    await expect(page.getByRole('heading', { name: 'Knowledge Map' })).toBeVisible();

    await page.goto('/profile');
    await expect(page.getByRole('heading', { name: 'Profile Page' })).toBeVisible();
  });
});
