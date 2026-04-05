import { expect, test, type APIRequestContext } from '@playwright/test';

import { loginAsTestUser } from './helpers/login';

async function getFirstTopicSlug(request: APIRequestContext): Promise<string | null> {
  const apiUrl = process.env.E2E_API_URL ?? process.env.VITE_API_URL ?? 'http://localhost:6969';
  const base = apiUrl.replace(/\/$/, '');
  const res = await request.get(`${base}/knowledge/topics`);
  if (!res.ok()) {
    return null;
  }
  const topics = (await res.json()) as { slug?: string }[];
  return topics[0]?.slug ?? null;
}

test.describe('Topic page', () => {
  test('shows topic title and tab controls after login', async ({ page, request }) => {
    const slug = await getFirstTopicSlug(request);
    test.skip(!slug, 'No topics returned from API; seed knowledge data first.');

    await loginAsTestUser(page);

    await page.goto(`/topics/${slug}`);

    await expect(page.locator('main h1')).toBeVisible({ timeout: 60_000 });
    await expect(page.locator('main h1')).not.toHaveText('');

    await expect(page.getByRole('button', { name: 'Overview' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Theory Questions' })).toBeVisible();
  });
});
