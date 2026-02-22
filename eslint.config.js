import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.app.json',
      },
    },
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'prettier/prettier': 'error',

      'react/react-in-jsx-scope': 'off',

      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/no-duplicates': 'error',

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  eslintPluginPrettierRecommended,
]);
