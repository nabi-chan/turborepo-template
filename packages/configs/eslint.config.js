import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import imports from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import importsSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import { ignore } from './eslint-ignore.js';

const compat = new FlatCompat();

/** @type {import('eslint').Linter.FlatConfig[]} */

export default [
  { ignores: [ignore] },
  js.configs.recommended,
  ...compat.extends('plugin:@typescript-eslint/strict', 'plugin:@typescript-eslint/stylistic'),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: { 'import': imports, 'import-sort': importsSort },
    rules: {
      'no-undef': 'off',
      'object-shorthand': ['error', 'always'],
      'import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:', '^@?\\w', '^', '^\\.', '^node:.*\\u0000$', '^@?\\w.*\\u0000$', '\\u0000$', '^\\..*\\u0000$'],
          ],
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      'no-restricted-imports': ['error', { paths: ['src'], patterns: ['../*'] }],
      'no-restricted-modules': ['error', { paths: ['src'], patterns: ['../*'] }],
      'no-unused-vars': ['error', { ignoreRestSiblings: true }],
      'no-useless-constructor': 'error',
    },
  },
  {
    files: ['**/*.config.[jt]s'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['**/*.config.c[jt]s'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['**/*.config.[jt]sx'],
    extends: ['plugin:react/jsx-runtime'],
    plugins: { reactHooks },
    rules: {
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
        },
      ],
      'react/jsx-curly-spacing': ['error', { when: 'never', children: { when: 'always' } }],
    },
  },
  ...compat.extends('prettier'),
];
