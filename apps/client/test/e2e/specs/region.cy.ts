import { Interception } from 'cypress/types/net-stubbing';
import { navigate } from '@test/helpers/cypress/navigate';

function selectRandomRegion(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy
    .get('[data-test="field-region-select"] [data-test="select"] option')
    .random()
    .invoke('val')
    .then((region: string): Cypress.Chainable<JQuery<HTMLElement>> => {
      return cy.get('[data-test="field-region-select"] [data-test="select"]').select(region, { force: true });
    });
}

describe('Region', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));
  });

  it('should change region, navigate to item list, and send request with region context', () => {
    cy.intercept('GET', `${Cypress.env('MARKET_API_URL')}/list/**/**`).as('list');

    selectRandomRegion()
      .invoke('val')
      .then((region: string): void => {
        navigate();

        cy.wait('@list')
          .then((interception: Interception) => interception.request.query.region)
          .should('equal', region);
      });
  });
});
