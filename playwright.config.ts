import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: /.*\.test\.e2e\.ts$/,

  use: {
    headless: true
  },

  webServer: {
    command: 'npm run start',
    port: 8080
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: devices['Desktop Chrome']
    },
    {
      name: 'Desktop Firefox',
      use: devices['Desktop Firefox']
    },
    {
      name: 'Desktop Safari',
      use: devices['Desktop Safari']
    },
    {
      name: 'Pixel 4',
      use: devices['Pixel 4']
    },
    {
      name: 'iPhone 11',
      use: devices['iPhone 11']
    }
  ]
};

export default config;
