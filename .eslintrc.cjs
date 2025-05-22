// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // ⬅️ Enables Prettier as ESLint rule
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'], // ⬅️ Show prettier issues as lint errors
    'no-unused-vars': 'warn',
    'react/prop-types': 'off', // if you don't use PropTypes
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
