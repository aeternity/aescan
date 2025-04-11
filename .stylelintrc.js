module.exports = {
  'defaultSeverity': 'warning',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-config-html/vue',
    'stylelint-config-recommended-vue',
  ],
  'rules': {
    'declaration-block-no-duplicate-properties': true,
    'selector-pseudo-element-colon-notation': 'single',
    'comment-whitespace-inside': null,
    'comment-empty-line-before': null,
    'rule-empty-line-before': null,
    'selector-class-pattern': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-empty-line-before': [
      'never',
      {
        'ignore': [
          'after-comment',
          'after-declaration',
        ],
      },
    ],
    'max-nesting-depth': [
      3,
      {
        'ignore': [
          'pseudo-classes',
          'blockless-at-rules',
        ],
      },
    ],
  },
}
