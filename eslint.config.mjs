import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    // rules: {
    //   'no-unused-vars': 'warn',
    //   'no-undef': 'warn',
    // },
  },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  [globalIgnores(['.aws-sam/*', 'node_modules/*', 'dist/*', 'build/*', 'coverage/*', 'out/*'])],
]);
