// eslint-disable-next-line no-restricted-imports,import/extensions
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['**/dist', '**/.nuxt', '**/.output'],
  rules: {
    'max-len': ['error', {
      code: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    'no-console': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'no-restricted-imports': ['error', {
      patterns: ['./'],
    }],

    'camelcase': ['error', {
      properties: 'never',
    }],

    'import/extensions': ['error', 'never'],
    'import/no-named-as-default-member': 'off',
    'import/named': 'off',
    'import/no-named-as-default': 'off',
    'import/default': 'off',

    'vue/require-v-for-key': 'error',
    'vue/no-v-html': 0,
    'vue/object-curly-spacing': ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/no-multiple-template-root': 'off',

    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
    }],

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
  },
})
