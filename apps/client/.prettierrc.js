module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: 'tailwind.config.js',
  importOrder: [
    '^vue',
    '<THIRD_PARTY_MODULES>',
    '^@/types/(.*)$',
    '^@/interfaces/(.*)$',
    '^@/exceptions/(.*)$',
    '^@/enums/(.*)$',
    '^@/configs/(.*)$',
    '^@/router/(.*)$',
    '^@/layouts/(.*)$',
    '^@/views/(.*)$',
    '^@/stores/(.*)$',
    '^@/composables/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^@/(.*)$',
  ],
};
