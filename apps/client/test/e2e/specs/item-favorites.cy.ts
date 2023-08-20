import { navigate } from '@test/helpers/cypress/navigate';

function addRandomItemToFavorites(): void {
  navigate(true);

  cy.get('[data-test="favorites"]').click();
  cy.get('[data-test="list-to-favorites"]').click();
}

describe('Add to Favorites', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));

    cy.clearLocalStorage();
  });

  it('should navigate to item list, click on item, and add item to favorites', () => {
    addRandomItemToFavorites();

    cy.window().its('localStorage').invoke('getItem', 'favorites.favorites').should('not.be.empty');
  });

  it('should navigate to item list, click on item, add item to favorites, and remove item from favorites', () => {
    addRandomItemToFavorites();

    cy.get('[data-test="remove-button"]').click();

    cy.window().its('localStorage').invoke('getItem', 'favorites.favorites').should('equal', '[]');
  });

  it('should navigate to item list, click on item, add item to favorites, and search by favorite item', () => {
    addRandomItemToFavorites();

    cy.get('[data-test="item-favorites-item"]')
      .invoke('attr', 'data-search-word')
      .then((searchWord: string): void => {
        cy.get('[data-test="search-button"]').click();

        cy.get('[data-test="list-filter-search"] [data-test="input"]').should('have.value', searchWord);
      });
  });
});
