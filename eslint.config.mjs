import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['./node_modules/*', './bin/*'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': 'error',
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'no-console': 'off',
      'func-names': 'off',
      'no-underscore-dangle': 'off',
      'consistent-return': 'off',
      'no-param-reassign': [2, { props: false }],
      'no-await-in-loop': 'off',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-constant-condition': 'warn',
      'no-empty': 'warn',
      'no-extra-semi': 'error',
      'no-irregular-whitespace': 'error',
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'no-trailing-spaces': 'error',
      'prefer-const': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
    },
  },
  eslintConfigPrettier,
];
