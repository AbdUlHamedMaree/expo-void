/**@type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: [
    'universe/native',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['unused-imports'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      1,
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    'react/prop-types': 0,
  },
};
