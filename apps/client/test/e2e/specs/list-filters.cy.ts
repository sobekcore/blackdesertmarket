const MOCK_SEARCH: string = 'Kzarka';

describe('List Filters', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));
  });

  it('should navigate to item list, and search for item', () => {
    cy.get('[data-test="category-sidemenu-sub-item"]').clickOnRandom({ force: true });

    cy.get('[data-test="list-filter-search"] [data-test="input"]').focus();
    cy.get('[data-test="list-filter-search"] [data-test="input"]').type(MOCK_SEARCH);
    cy.get('[data-test="list-filter-search"] [data-test="input"]').blur();

    cy.get('[data-test="list-item"]').should('contain.text', MOCK_SEARCH);
  });

  it('should navigate to item list, and filter items by count', () => {
    cy.intercept('GET', `${Cypress.env('MARKET_API_URL')}/list/**/**`).as('list');

    cy.get('[data-test="category-sidemenu-sub-item"]').clickOnRandom({ force: true });

    cy.get('[data-test="list-filter-sort-count"] [data-test="button"]').click();
    cy.wait('@list');

    cy.get('[data-test="loader"]').should('not.exist');

    cy.get('[data-test="list-item-count"] [data-test="value"]')
      .then((elements: JQuery<HTMLElement>): boolean => {
        return elements.toArray().every((element: HTMLElement, index: number, elements: HTMLElement[]): boolean => {
          return !index || Number(elements[index - 1].innerText) >= Number(element.innerText);
        });
      })
      .should('equal', true);
  });
});
