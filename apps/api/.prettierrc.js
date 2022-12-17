module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  pluginSearchDirs: false,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrder: [
    '^@nestjs',
    '<THIRD_PARTY_MODULES>',
    '^@test/(.*)$',
    '^@/interfaces/(.*)$',
    '^@/exceptions/(.*)$',
    '^@/enums/(.*)$',
    '^@/modules/(.*)$',
    '^@/filters/(.*)$',
    '^@/(.*)$',
  ],
};
