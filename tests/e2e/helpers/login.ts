import type { Page } from '@playwright/test';

const defaultEmail = 'e2e-playwright@example.com';
const defaultPassword = 'E2e_test_12345';

export async function loginAsTestUser(page: Page) {
  const email = process.env.E2E_USER_EMAIL ?? defaultEmail;
  const password = process.env.E2E_USER_PASSWORD ?? defaultPassword;

  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.locator('form').getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/\/map$/);
}
