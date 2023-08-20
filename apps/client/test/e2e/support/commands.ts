declare namespace Cypress {
  interface Chainable {
    random(): Cypress.Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add(
  'random',
  { prevSubject: 'element' },
  (subject: Cypress.JQueryWithSelector<HTMLElement>): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.wrap(subject.eq(Math.floor(Math.random() * subject.length)));
  },
);
