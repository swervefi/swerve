module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript'],
  overrides: [
    {
      // Overrides for all files
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'space-before-function-paren': [
          'error',
          {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
          },
        ],
      },
    },
  ],
}
