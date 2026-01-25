import eslint from "@eslint/js"
import eslintTanstackQuery from "@tanstack/eslint-plugin-query"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import eslintPluginAstro from "eslint-plugin-astro"
import eslintPluginReact from "eslint-plugin-react"
import eslintPluginReactCompiler from "eslint-plugin-react-compiler"
import eslintPluginReactHooks from "eslint-plugin-react-hooks"
import eslintPluginReactRefresh from "eslint-plugin-react-refresh"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
      ...eslintPluginReactCompiler.configs.recommended.rules,
      ...eslintTanstackQuery.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    plugins: {
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh,
      "react-compiler": eslintPluginReactCompiler,
      "@tanstack/query": eslintTanstackQuery,
    },
    extends: [
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat["jsx-runtime"],
    ],
  },
  {
    files: ["/*.{js,jsx,cjs,mjs,ts,tsx,astro}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "import/order": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
        },
      ],
    },
  },
  {
    ignores: [
      "**/public",
      "**/dist",
      "**/dist/*",
      "**/.tanstack",
      "**/.astro",
      "**/*.gen.ts",
      "**/tests/*",
      "coverage",
      "node_modules/*",
      "**/__generated__/*",
      ".gitignore",
    ],
  }
)
