import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: /.*\.test\.audit\.ts$/,

  timeout: 5 * 60 * 1000,

  fullyParallel: true,

  use: {
    headless: true
  },

  webServer: {
    command: `npm run start:stubs:prod:no-delay`,
    port: 8080
  }
};

export default config;
