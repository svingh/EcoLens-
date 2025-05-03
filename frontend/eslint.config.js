const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: typescriptEslintParser,
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      
      // Formatting
      'max-len': ['error', { code: 100 }], // Limit lines to 100 characters
      
      // TypeScript Specific Rules
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];