import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.spec.ts',
  globalSetup: './src/fixtures/globalSetup.ts',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: process.env.CI ? 2 : 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },

  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8080/parabank',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      testMatch: '**/e2e/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: '**/e2e/**/*.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: '**/e2e/**/*.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      use: { baseURL: process.env.API_URL || 'http://localhost:8080/parabank/services/bank' },
    },
  ],
});