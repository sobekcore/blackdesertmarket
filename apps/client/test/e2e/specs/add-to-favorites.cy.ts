describe('Add to Favorites', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));

    cy.clearLocalStorage();
  });

  it('should navigate to item list, click on item, and add item to favorites', () => {
    cy.get('[data-test="category-sidemenu-sub-item"]').clickOnRandom({ force: true });
    cy.get('[data-test="list-item"]').clickOnRandom();

    cy.get('[data-test="favorites"]').click();
    cy.get('[data-test="list-to-favorites"]').click();

    cy.window().its('localStorage').invoke('getItem', 'favorites.favorites').should('not.be.empty');
  });
});
