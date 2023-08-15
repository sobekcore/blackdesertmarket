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
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['src/**/*.spec.ts'],
      env: {
        'jest/globals': true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
    },
    {
      files: ['test/**/*.cy.ts'],
      env: {
        'cypress/globals': true,
      },
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  rules: {
    '@typescript-eslint/ban-types': ['error', typescriptEslintBanTypesSettings],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'vue/require-default-prop': 'off',
    'vue/one-component-per-file': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'sort-imports': ['error', sortImportsSettings],
    'no-prototype-builtins': 'off',
  },
};
