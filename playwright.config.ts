import { defineConfig, devices } from '@playwright/test';

// Must match backend CORS (default Nest CORS_ORIGIN is http://localhost:5173). Using 127.0.0.1 breaks browser API calls
const apiUrl = process.env.E2E_API_URL ?? process.env.VITE_API_URL ?? 'http://localhost:6969';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 120_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'html',
  globalSetup: './tests/e2e/global-setup.ts',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      VITE_API_URL: apiUrl,
    },
  },
});
