import { navigate } from '@test/helpers/cypress/navigate';

describe('Item Tooltip', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));
  });

  it('should navigate to item list, hover on item, and display item tooltip', () => {
    navigate();

    cy.get('[data-test="list-item-icon"]').random().trigger('mouseenter');

    cy.get('[data-test="list-item-tooltip"]').should('exist');
  });
});
