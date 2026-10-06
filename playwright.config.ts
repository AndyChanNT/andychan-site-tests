import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error('BASE_URL is not set. Set it to the live URL of the site under test.');
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // Trailing slash so that page.goto('./') keeps any path in BASE_URL.
    baseURL: baseURL.endsWith('/') ? baseURL : `${baseURL}/`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
