import globals from "globals";
import { ESLint } from "eslint";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";

/** @type {ESLint.ConfigData} */
export default {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts}"],
      languageOptions: {
        parser: tseslintParser,
        globals: globals.node,
      },
      plugins: ["@typescript-eslint"],
      rules: {
        ...tseslint.configs.recommended.rules,
      },
    },
  ],
};
