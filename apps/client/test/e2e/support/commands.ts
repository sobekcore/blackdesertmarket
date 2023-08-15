declare namespace Cypress {
  interface Chainable {
    clickOnRandom(options?: Partial<Cypress.ClickOptions>): Cypress.Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add(
  'clickOnRandom',
  { prevSubject: 'element' },
  (
    subject: Cypress.JQueryWithSelector<HTMLElement>,
    options?: Partial<Cypress.ClickOptions>,
  ): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.wrap(subject.eq(Math.floor(Math.random() * subject.length))).click(options);
  },
);
