import { navigate } from '@test/helpers/cypress/navigate';
import { MarketApiCode } from '@/enums/market-api-code';

describe('Status', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));

    cy.on('uncaught:exception', () => {
      return false;
    });
  });

  it('should display Offline message when error occurred during a request', () => {
    cy.intercept('GET', `${Cypress.env('MARKET_API_URL')}/list/**/**`, { forceNetworkError: true }).as('listOffline');

    navigate();
    cy.wait('@listOffline');

    cy.get('[data-test="status-offline"]').should('contain.text', 'Offline');
  });

  it('should display Maintenance message when request contains information about the maintenance', () => {
    cy.intercept('GET', `${Cypress.env('MARKET_API_URL')}/list/**/**`, {
      statusCode: 503,
      body: {
        code: MarketApiCode.MAINTENANCE,
      },
    }).as('listMaintenance');

    navigate();
    cy.wait('@listMaintenance');

    cy.get('[data-test="status-maintenance"]').should('contain.text', 'Maintenance');
  });
});
