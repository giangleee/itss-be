module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    // es7: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'space-before-function-paren': 'off',
  },
};
