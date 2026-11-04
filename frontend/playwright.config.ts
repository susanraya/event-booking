import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:4173";
const runAgainstDeployment = Boolean(process.env.E2E_BASE_URL);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  // One retry by default so a single flaky frame does not fail the whole suite; a genuine
  // failure still fails on the retry. `trace: on-first-retry` below captures why.
  retries: process.env.CI ? 2 : 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  // --disable-dev-shm-usage: Chromium keeps its shared memory in /dev/shm, and a
  // container's default 64 MB is too small -- it crashes under load. This routes
  // that memory to /tmp instead, the standard fix for running Chromium in Docker.
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: { args: ["--disable-dev-shm-usage"] },
      },
    },
  ],
  // No deployed target given: boot the app locally so the suite runs against this
  // code. Skipped when E2E_BASE_URL is set -- there is already a live app.
  webServer: runAgainstDeployment
    ? undefined
    : [
      {
        // The generated API, started from backend/ with its packages installed before
        // the run. With no DATABASE_URL it falls back to a local database (SQLite for a
        // Python backend, an in-memory PostgreSQL for a Node one), so it runs end to end
        // with no database server to stand up.
        command:
          "cd ../backend && MAVEN_OPTS=-Xmx512m mvn -B -ntp -o -q -Dmaven.repo.local=.m2/repository -Dmaven.test.skip=true -Djacoco.skip=true package && HOST=127.0.0.1 PORT=8000 java -Xmx384m -jar target/app.jar",
        url: "http://127.0.0.1:8000/health",
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
      {
        command: "npm run build && npm run preview -- --port 4173 --host 127.0.0.1",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
    ],
});
