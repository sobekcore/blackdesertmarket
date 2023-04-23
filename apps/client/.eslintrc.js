const typescriptEslintBanTypesSettings = {
  types: {
    '{}': false,
  },
};

const sortImportsSettings = {
  ignoreDeclarationSort: true,
};

module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/ban-types': ['error', typescriptEslintBanTypesSettings],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/require-default-prop': 'off',
    'vue/one-component-per-file': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'sort-imports': ['error', sortImportsSettings],
    'no-prototype-builtins': 'off',
  },
};
