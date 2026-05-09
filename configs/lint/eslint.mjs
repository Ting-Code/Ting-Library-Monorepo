import { fileURLToPath } from 'node:url'

import antfu, { nextjs } from '@antfu/eslint-config'

const codeFiles = ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}']
const reactFiles = [
  'packages/apps/micro-demo/**/*.{js,jsx,ts,tsx}',
  'packages/apps/ssr/**/*.{js,jsx,ts,tsx}',
  'packages/lib/react/**/*.{js,jsx,ts,tsx}'
]
const nextFiles = [
  'packages/apps/ssr/**/*.{js,jsx,ts,tsx}',
  'app/**/*.{js,jsx,ts,tsx}',
  'lib/**/*.{js,jsx,ts,tsx}',
  'next.config.{js,jsx,ts,tsx}'
]
const nextRootDir = fileURLToPath(new URL('../../packages/apps/ssr/', import.meta.url))

export default antfu(
  {
    type: 'app',
    e18e: false,
    jsdoc: false,
    regexp: false,
    test: false,
    typescript: true,
    unicorn: false,
    vue: {
      overrides: {
        'vue/attribute-hyphenation': 'off',
        'vue/attributes-order': 'off',
        'vue/block-order': 'off',
        'vue/custom-event-name-casing': 'off',
        'vue/define-macros-order': 'off',
        'vue/dot-notation': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-self-closing': [
          'error',
          {
            html: {
              component: 'always',
              normal: 'never',
              void: 'always'
            },
            math: 'always',
            svg: 'always'
          }
        ],
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/no-required-prop-with-default': 'off',
        'vue/no-useless-v-bind': 'off',
        'vue/one-component-per-file': 'off',
        'vue/prefer-separate-static-class': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/v-on-event-hyphenation': 'off'
      }
    },
    react: {
      files: reactFiles
    },
    nextjs: false,
    stylistic: false,
    formatters: false,
    jsonc: false,
    markdown: false,
    pnpm: false,
    toml: false,
    yaml: false,
    ignores: [
      '**/*.md',
      '**/*.sh',
      '**/*.woff',
      '**/*.ttf',
      '**/.husky/**',
      '**/.idea/**',
      '**/.local/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/.vscode/**',
      '**/bin/**',
      '**/dist/**',
      '**/docs/**',
      '**/node_modules/**',
      '**/public/**',
      '**/*-dist/**',
      '**/Dockerfile'
    ]
  },
  {
    name: 'ting/base-overrides',
    files: codeFiles,
    rules: {
      'antfu/no-top-level-await': 'off',
      'array-callback-return': 'off',
      'dot-notation': 'off',
      eqeqeq: 'off',
      'import/first': 'off',
      'import/no-duplicates': 'off',
      'import/no-mutable-exports': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-undef': 'off',
      'no-useless-return': 'off',
      'no-unneeded-ternary': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'node/prefer-global/process': 'off',
      'object-shorthand': 'off',
      'one-var': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-exports': 'off',
      'perfectionist/sort-named-imports': 'off',
      'prefer-arrow-callback': 'off',
      'prefer-exponentiation-operator': 'off',
      'prefer-promise-reject-errors': 'off',
      'prefer-template': 'off',
      'symbol-description': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/consistent-type-definitions': 'off',
      'ts/consistent-type-imports': 'off',
      'ts/explicit-function-return-type': 'off',
      'ts/explicit-module-boundary-types': 'off',
      'ts/no-empty-function': 'off',
      'ts/no-empty-object-type': 'off',
      'ts/no-explicit-any': 'off',
      'ts/no-non-null-assertion': 'off',
      'ts/no-require-imports': 'off',
      'ts/no-unsafe-function-type': 'off',
      'ts/no-wrapper-object-types': 'off',
      'ts/method-signature-style': 'off',
      'ts/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'ts/no-use-before-define': 'off',
      'unused-imports/no-unused-vars': 'off',
      yoda: 'off'
    }
  },
  {
    name: 'ting/react-overrides',
    files: reactFiles,
    rules: {
      'react-naming-convention/ref-name': 'off',
      'react/no-array-index-key': 'off',
      'react/prefer-namespace-import': 'off',
      'react-refresh/only-export-components': 'off'
    }
  },
  nextjs({
    files: nextFiles
  }),
  {
    name: 'ting/next-settings',
    files: nextFiles,
    settings: {
      next: {
        rootDir: nextRootDir
      }
    }
  }
)
