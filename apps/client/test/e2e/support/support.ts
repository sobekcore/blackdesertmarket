import './commands';

beforeEach(() => {
  /**
   * Mock responses for all item icons, they make tests run slower and create unnecessary requests
   */
  cy.intercept('GET', `${Cypress.env('MARKET_API_URL')}/item/**/icon`, { body: '' });
});
