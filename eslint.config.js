import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,astro}"],
    ignores: ["**/dist/**/*", "*.config.js"],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  ...eslintPluginAstro.configs.recommended,
];
