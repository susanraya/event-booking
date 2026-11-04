// Loaded by Vitest before every test file (see `test.setupFiles` in vite.config.ts).
//
// Angular's test bed, set up without zone.js as the app runs; and jest-dom's matchers --
// toBeInTheDocument, toBeDisabled, toHaveValue -- for the DOM a component renders.
import "@angular/compiler";
import "@testing-library/jest-dom/vitest";

import { setupTestBed } from "@analogjs/vitest-angular/setup-testbed";

setupTestBed({ zoneless: true });
