import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: 0,
  reporter: "line",
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure" },
  webServer: { command: "npm run dev -- --hostname 127.0.0.1 --port 3100", url: "http://127.0.0.1:3100", reuseExistingServer: true, timeout: 120_000 },
  projects: [
    {
      name: "mobile-chromium",
      testIgnore: /.*\.desktop\.spec\.ts/,
      use: { ...devices["iPhone 13"], browserName: "chromium" },
    },
    {
      name: "desktop-chromium",
      testMatch: /.*\.desktop\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
        viewport: { width: 1440, height: 1000 },
      },
    },
  ],
});
