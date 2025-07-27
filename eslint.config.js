import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import pluginImport from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{mts,ts,tsx}", "**/*.{js,mjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: pluginImport
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      /**
       * Disallow unused variables
       *
       * @see https://typescript-eslint.io/rules/no-unused-vars
       */
      "@typescript-eslint/no-unused-vars": "warn",
      /**
       * Disallow the use of console
       *
       * @see https://eslint.org/docs/latest/rules/no-console
       */
      "no-console": "warn",
      "react-refresh/only-export-components": "off",
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: ["builtin", "external", ["parent", "sibling"], "index"]
        }
      ]
    }
  }
);
