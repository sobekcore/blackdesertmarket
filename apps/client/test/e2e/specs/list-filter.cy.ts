import { navigate } from '@test/helpers/cypress/navigate';

const MOCK_SEARCH: string = 'Kzarka';

function assertFilterBySelector(
  filterSelector: string,
  itemSelector: string,
  extract: (value: HTMLElement) => number,
): Cypress.Chainable<boolean> {
  cy.intercept('GET', `${Cypress.env('MARKET_API_URL')}/list/**/**`).as('list');

  navigate();

  cy.get(filterSelector).click();
  cy.wait('@list');

  cy.get('[data-test="loader"]').should('not.exist');

  return cy
    .get(itemSelector)
    .then((elements: JQuery<HTMLElement>): boolean => {
      return elements.toArray().every((element: HTMLElement, index: number, elements: HTMLElement[]): boolean => {
        if (!index) {
          return true;
        }

        const previous: number = extract(elements[index - 1]);
        const current: number = extract(element);

        return previous >= current;
      });
    })
    .should('equal', true);
}

describe('List Filter', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));
  });

  it('should navigate to item list, and search for item', () => {
    navigate();

    cy.get('[data-test="list-filter-search"] [data-test="input"]').focus();
    cy.get('[data-test="list-filter-search"] [data-test="input"]').type(MOCK_SEARCH);
    cy.get('[data-test="list-filter-search"] [data-test="input"]').blur();

    cy.get('[data-test="list-item"]').should('contain.text', MOCK_SEARCH);
  });

  it('should navigate to item list, and filter items by count', () => {
    assertFilterBySelector(
      '[data-test="list-filter-sort-count"] [data-test="button"]',
      '[data-test="list-item-count"] [data-test="value"]',
      (element: HTMLElement): number => {
        return Number(element.innerText);
      },
    );
  });

  it('should navigate to item list, and filter items by price', () => {
    assertFilterBySelector(
      '[data-test="list-filter-sort-price"] [data-test="button"]',
      '[data-test="list-item-price"] [data-test="value"]',
      (element: HTMLElement): number => {
        return Number(element.innerText.replaceAll(',', ''));
      },
    );
  });

  it('should navigate to item list, and filter items by grade', () => {
    assertFilterBySelector(
      '[data-test="list-filter-sort-grade"] [data-test="button"]',
      '[data-test="list-item-price"] [data-test="value"]',
      (element: HTMLElement): number => {
        return Number(element.getAttribute('data-item-grade'));
      },
    );
  });
});
