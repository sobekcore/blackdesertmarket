import { navigate } from '@test/helpers/cypress/navigate';

describe('Item List', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));
  });

  it('should navigate to item list, click on item, and click on item enhancement', () => {
    navigate(true, true);

    cy.url().should('match', new RegExp(`${Cypress.env('MARKET_CLIENT_URL')}/item/\\d+/\\d+`));
  });
});
