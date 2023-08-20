export function navigate(item?: boolean, itemEnhancement?: boolean): void {
  cy.get('[data-test="category-sidemenu-sub-item"]').random().click({ force: true });

  if (item) {
    cy.get('[data-test="list-item"]').random().click();

    if (itemEnhancement) {
      cy.get('[data-test="list-item"]').random().click();
    }
  }
}
