import { navigate } from '@test/helpers/cypress/navigate';
import { ItemDetailsDays } from '@/enums/item-details';

describe('Item Details', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('MARKET_CLIENT_URL'));
  });

  describe('should navigate to item list, click on item, click on item enhancement, and change number of months', () => {
    beforeEach(() => {
      navigate(true, true);
    });

    it('when months = one', () => {
      cy.get('[data-test="one-month"]').click();

      cy.get('[data-test="item-details-chart"]')
        .invoke('attr', 'data-days')
        .should('equal', String(ItemDetailsDays.ONE_MONTH));
    });

    it('when months = three', () => {
      cy.get('[data-test="three-months"]').click();

      cy.get('[data-test="item-details-chart"]')
        .invoke('attr', 'data-days')
        .should('equal', String(ItemDetailsDays.THREE_MONTHS));
    });
  });
});
