import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: /.*\.test\.e2e\.ts$/,

  timeout: process.env.CI === 'true' ? 5 * 60 * 1000 : undefined,

  fullyParallel: true,

  use: {
    headless: true
  },

  webServer: {
    command: `npm run start:${process.env.API}:no-delay`,
    port: 8080
  },

  projects: [
    // Avoid getting "429 Too Many Requests" from marvel.com
    { name: 'Desktop Chrome', use: devices['Desktop Chrome'] },
    ...(process.env.API === 'stubs'
      ? [
          { name: 'Desktop Firefox', use: devices['Desktop Firefox'] },
          { name: 'Desktop Safari', use: devices['Desktop Safari'] },
          { name: 'Pixel 4', use: devices['Pixel 4'] },
          { name: 'iPhone 11', use: devices['iPhone 11'] }
        ]
      : [])
  ]
};

export default config;
