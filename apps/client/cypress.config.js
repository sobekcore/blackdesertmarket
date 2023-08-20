const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'test/e2e/specs/*.cy.ts',
    supportFile: 'test/e2e/support/support.ts',
  },
  env: {
    MARKET_CLIENT_URL: 'https://blackdesertmarket.com',
    MARKET_API_URL: 'https://api.blackdesertmarket.com',
  },
});
