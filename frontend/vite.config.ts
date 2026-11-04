/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import angular from "@analogjs/vite-plugin-angular";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Analog compiles the Angular components ahead of time, as the Angular CLI would; the
  // rest of the toolchain (dev server, build, preview, Vitest) is Vite's own.
  plugins: [angular(), tailwindcss()],
  // Analog takes TypeScript over from Vite's esbuild step, and Vite's esbuild minifier
  // goes with it; terser minifies instead.
  build: { target: "es2022", minify: "terser" },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  // Component tests live beside the components they cover, in jsdom.
  test: {
    // Component tests only. Scoped to `src/` so the Playwright specs in `e2e/` -- which
    // match the default `*.spec.ts` pattern -- are left to Playwright.
    include: ["src/**/*.spec.ts"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    css: false,
    // Coverage is measured by the sprint's test check and reported as a json-summary the
    // platform reads back for the development dashboard.
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      reportsDirectory: "./coverage",
    },
  },
});
