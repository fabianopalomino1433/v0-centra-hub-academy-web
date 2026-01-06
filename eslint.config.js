import globals from "globals";
import js from "@eslint/js";

export default [
  {
    ignores: ["node_modules/", ".next/", "dist/"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];