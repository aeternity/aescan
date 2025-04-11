import pluginVue from 'eslint-plugin-vue'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import js from '@eslint/js'
import parser from 'vue-eslint-parser'

export default [
  { ignores: ['**/dist', '**/.nuxt', '**/.output'] },
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,

  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parser,
      ecmaVersion: 2022,
      parserOptions: {
        extraFileExtensions: ['.vue'],

        ecmaFeatures: {
          jsx: false,
        },
      },
    },

    rules: {

      'no-undef': 'off',
      'import/no-unresolved': 'off',
      'import/namespace': 'off',
      'import/extensions': 'off',
      // 'import/extensions': ['error', 'never'],


      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
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
  },
]
