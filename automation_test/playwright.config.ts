import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'https://www.saucedemo.com', 
    headless: false,
    viewport: null,                  
    launchOptions: {
      slowMo: 500,
      args: ['--start-maximized']    
    },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
  projects: [

    {
      name: 'setup',
      testMatch: /login.setup.ts/
    },

    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        storageState: 'storageState.json'
      },
      dependencies: ['setup']
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        storageState: 'storageState.json'
      },
      dependencies: ['setup']
    },

    {
      name: 'login-tests',
      testMatch: /login.spec.ts/,
      use: {
        browserName: 'chromium'
      }
    }

  ],
  reporter: [
    ['html', { open: 'never' }]
  ],
  testDir: './tests'
});