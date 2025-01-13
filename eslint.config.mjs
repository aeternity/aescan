import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fixupConfigRules } from '@eslint/compat'
import prettier from 'eslint-plugin-prettier'
import parser from 'vue-eslint-parser'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [{
  ignores: ['**/dist', '**/.nuxt', '**/.output'],
}, ...fixupConfigRules(compat.extends(
  'standard',
  'plugin:vue/base',
  'plugin:vue/vue3-recommended',
  'plugin:import/recommended',
  'eslint:recommended',
  '@nuxtjs/eslint-config-typescript',
)), {
  plugins: {
    prettier,
  },

  languageOptions: {
    globals: {
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly',
    },

    parser,
    ecmaVersion: 2020,
    sourceType: 'script',

    parserOptions: {
      extraFileExtensions: ['.vue'],

      ecmaFeatures: {
        jsx: false,
      },
    },
  },

  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'off',
    'import/namespace': 'off',
    quotes: ['error', 'single'],
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    'space-before-function-paren': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'import/no-named-as-default-member': 'off',
    'import/named': 'off',
    'import/no-named-as-default': 'off',
    'import/default': 'off',

    'no-restricted-imports': ['error', {
      patterns: ['./'],
    }],

    'import/extensions': ['error', 'never'],

    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
    }],

    'vue/multi-word-component-names': 'off',
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/no-multiple-template-root': 'off',

    'vue/no-unused-components': ['error', {
      ignoreWhenBindingPresent: false,
    }],

    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never',
    }],

    'vue/multiline-html-element-content-newline': ['error', {
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea', 'a', 'span', 'app-link', 'router-link'],
      allowEmptyLines: false,
    }],

    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'never',
    }],

    'vue/max-attributes-per-line': ['error', {
      singleline: 1,

      multiline: {
        max: 1,
      },
    }],

    'vue/require-v-for-key': 'error',
    'vue/no-v-html': 0,
    semi: ['error', 'never'],

    camelcase: ['error', {
      properties: 'never',
    }],

    'max-len': ['error', {
      code: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
  },
}]
