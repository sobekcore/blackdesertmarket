import { Interception } from 'cypress/types/net-stubbing';
import { navigate } from '@test/helpers/cypress/navigate';

function selectRandomLanguage(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy
    .get('[data-test="field-language-select"] [data-test="select"] option')
    .random()
    .invoke('val')
    .then((language: string): Cypress.Chainable<JQuery<HTMLElement>> => {
      return cy.get('[data-test="field-language-select"] [data-test="select"]').select(language, { force: true });
    });
}

describe('Language', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));
  });

  it('should change documentElement lang when changing language', () => {
    selectRandomLanguage()
      .invoke('val')
      .then((language: string): void => {
        cy.get('html').invoke('attr', 'lang').should('equal', language);
      });
  });

  it('should change language, navigate to item list, and send request with language context', () => {
    cy.intercept('GET', `${Cypress.env('MARKET_API_URL')}/list/**/**`).as('list');

    selectRandomLanguage()
      .invoke('val')
      .then((language: string): void => {
        navigate();

        cy.wait('@list')
          .then((interception: Interception) => interception.request.query.language)
          .should('equal', language);
      });
  });
});
