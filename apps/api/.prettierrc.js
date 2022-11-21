module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  importOrder: [
    '^@nestjs',
    '<THIRD_PARTY_MODULES>',
    '^@/interfaces/(.*)$',
    '^@/exceptions/(.*)$',
    '^@/enums/(.*)$',
    '^@/mocks/(.*)$',
    '^@/modules/(.*)$',
    '^@/filters/(.*)$',
    '^@/(.*)$',
  ],
  importOrderParserPlugins: [
    'typescript',
    'decorators-legacy',
  ],
};
