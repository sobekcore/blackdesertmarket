module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
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
  importOrderParserPlugins: [
    'typescript',
    'decorators-legacy',
  ],
};
