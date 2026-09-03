import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  outputDir: "test-results",
  fullyParallel: true,
  workers: 4,
  retries: 0,
  timeout: 15_000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    video: "off",
    trace: "off",
    baseURL: "http://localhost:5173",
  },
  webServer: {
    command: "npm run start -- --strictPort",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 30_000,
    stdout: "ignore",
    stderr: "pipe",
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
