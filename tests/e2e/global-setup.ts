import type { FullConfig } from '@playwright/test';

const defaultEmail = 'e2e-playwright@example.com';
const defaultPassword = 'E2e_test_12345';

async function globalSetup(_config: FullConfig) {
  const apiUrl = process.env.E2E_API_URL ?? process.env.VITE_API_URL ?? 'http://localhost:6969';
  const email = process.env.E2E_USER_EMAIL ?? defaultEmail;
  const password = process.env.E2E_USER_PASSWORD ?? defaultPassword;

  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      name: 'E2E',
      surname: 'Playwright',
    }),
  });

  if (response.status === 409) {
    return;
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `E2E globalSetup: POST /auth/register failed (${response.status}): ${body}. Is the API running at ${apiUrl}?`,
    );
  }
}

export default globalSetup;
