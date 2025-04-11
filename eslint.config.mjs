// @ts-check

// eslint-disable-next-line no-restricted-imports
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['**/dist', '**/.nuxt', '**/.output'],
  rules: {

    // 'import/extensions': ['error', 'never'],
    'import/extensions': 'off',
    'no-console': 'off',
    'quotes': ['error', 'single'],
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2],
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
    'semi': ['error', 'never'],

    'camelcase': ['error', {
      properties: 'never',
    }],

    'max-len': ['error', {
      code: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
  },
})
