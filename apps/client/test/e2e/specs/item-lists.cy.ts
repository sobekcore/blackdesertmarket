describe('Item Lists', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));
  });

  it('should navigate to item list, click on item, and click on item enhancement', () => {
    cy.get('[data-test="category-sidemenu-sub-item"]').clickOnRandom({ force: true });
    cy.get('[data-test="list-item"]').clickOnRandom();
    cy.get('[data-test="list-item"]').clickOnRandom();

    cy.url().should('match', new RegExp(`${Cypress.env('MARKET_CLIENT_URL')}/item/\\d+/\\d+`));
  });
});
