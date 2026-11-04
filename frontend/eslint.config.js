import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
  {
    // Generated design screens carry `@ts-nocheck`: they are written under the design
    // phase's plain-JavaScript contract, not as hand-written TypeScript.
    files: ["src/screens/**"],
    rules: { "@typescript-eslint/ban-ts-comment": "off" },
  },
);
