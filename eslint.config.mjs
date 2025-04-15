// eslint.config.mjs

import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.env'], // 👈 Ignored folders here
  },
  {
    files: ['**/*.{js,ts,mjs,cjs}'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      // Prettier plugin is already included in prettierRecommended
    },

    rules: {
      // Typescript recommended rules
      ...tseslint.configs.recommended.rules,

      // Prettier formatting issues should be treated as errors
      'prettier/prettier': 'error',

      // Beginner-friendly and professional best practices
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn', // Useful for production code
      eqeqeq: 'error', // Always use === instead of ==
      curly: 'error', // Require curly braces for all control statements
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'object-curly-spacing': ['error', 'always'], // Enforce spacing inside { }
      semi: ['error', 'always'], // Always use semicolons
      // "quotes": ["error", "single", { avoidEscape: true }], // Consistent quotes
    },
  },

  // Prettier recommended config
  prettierRecommended,
]);
