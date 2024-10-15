Cypress.Commands.add(
  'getBySel',
  (selector: string, wildcard = false) => {
    if (wildcard) {
      return cy.get(`[data-testid*="${selector}"]`);
    }

    return cy.get(`[data-testid="${selector}"]`);
  },
);


declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(selector: string, child: string, wildcard: boolean): Chainable;
    }
  }
}
