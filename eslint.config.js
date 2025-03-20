import js from "@eslint/js";
import * as tseslint from "@typescript-eslint/eslint-plugin";
import * as tsParser from "@typescript-eslint/parser";
import astroPlugin from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

// ******************************************
// * SHARED CONFIGURATION OBJECTS
// ******************************************

/**
 * Shared browser globals for all configurations
 * This avoids duplication and ensures consistency across file types
 */
const browserGlobals = {
  // Browser window and document
  window: "readonly",
  document: "readonly",
  navigator: "readonly",
  localStorage: "readonly",
  sessionStorage: "readonly",
  
  // Network and fetch API
  fetch: "readonly",
  Request: "readonly",
  Response: "readonly",
  Headers: "readonly",
  
  // Timing functions
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
  requestAnimationFrame: "readonly",
  cancelAnimationFrame: "readonly",
  
  // Console and debugging
  console: "readonly",
  
  // DOM APIs
  HTMLElement: "readonly",
  Element: "readonly",
  Node: "readonly",
  NodeList: "readonly",
  Event: "readonly",
  IntersectionObserver: "readonly",
  MutationObserver: "readonly",
  ResizeObserver: "readonly",
  
  // JavaScript built-ins
  Promise: "readonly",
  Map: "readonly", 
  Set: "readonly",
  WeakMap: "readonly",
  WeakSet: "readonly",
  Array: "readonly",
  Object: "readonly",
  String: "readonly",
  Number: "readonly",
  Boolean: "readonly",
  Symbol: "readonly",
  JSON: "readonly",
  Math: "readonly",
  Date: "readonly",
  RegExp: "readonly",
  Error: "readonly",
  
  // Framework-specific globals
  React: "readonly",
};

/**
 * TypeScript parser options used in multiple configurations
 */
const tsParserOptions = {
  ecmaVersion: "latest",
  sourceType: "module",
};

export default [
  // Global ignores
  {
    ignores: [".astro/**", "dist/**"],
  },

  // Base ESLint configuration
  js.configs.recommended,

  // ******************************************
  // * TYPESCRIPT BASE CONFIGURATION
  // ******************************************
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.astro"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: tsParserOptions,
      globals: {
        ...browserGlobals,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_" 
      }],
      "@typescript-eslint/consistent-type-imports": ["warn", { 
        prefer: "type-imports" 
      }],
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },

  // ******************************************
  // * ASTRO CONFIGURATION
  // ******************************************
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
      globals: {
        ...browserGlobals,
        Astro: "readonly", // Astro-specific global
      },
    },
    plugins: {
      astro: astroPlugin,
    },
    rules: {
      // Astro specific rules
      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "error",
      "astro/valid-compile": "error",

      // Relaxed rules for Astro files
      "no-undef": "off", // Astro components have implicit variables
    },
  },

  // ******************************************
  // * TYPESCRIPT FILES CONFIGURATION (ts/tsx)
  // ******************************************
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ...tsParserOptions,
        project: "./tsconfig.json",
      },
      globals: {
        ...browserGlobals,
      },
    },
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": ["warn", {
        "ts-ignore": "allow-with-description",
        minimumDescriptionLength: 10,
      }],
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    },
  },
  
  // ******************************************
  // * REACT CONFIGURATION (.tsx files)
  // ******************************************
  {
    files: ["**/*.tsx"],
    languageOptions: {
      globals: {
        ...browserGlobals,
        JSX: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // React-specific rules
      "react/prop-types": "off", // Not needed with TypeScript
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "react/display-name": "off",
      "react/jsx-curly-brace-presence": ["warn", "never"],
      "react/jsx-no-target-blank": "error",
      "react/jsx-no-useless-fragment": "warn",
      
      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // ******************************************
  // * JAVASCRIPT FILES CONFIGURATION
  // ******************************************
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...browserGlobals,
      },
    },
    rules: {
      // JavaScript-specific rules
      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "prefer-const": "warn",
      "no-var": "warn",
      "eqeqeq": ["warn", "always", { "null": "ignore" }],
    },
  },
];
