describe('Search', () => {
  it('should display 8 hotels, 3 countries and no cities', () => {
    cy.visit('http://localhost:3000');
    cy.getBySel('search-input').type('uni');
    cy.getBySel('hotel-id', true).should('have.length', 8);
    cy.getBySel('country-id', true).should('have.length', 2);
    cy.getBySel('city-no-data').should('exist');
  });

  it('should visit hotel when clicking on hotel', () => {
    cy.visit('http://localhost:3000');
    cy.getBySel('search-input').type('uni');
    cy.getBySel('hotel-id', true).first().click();
    cy.url().should('include', '/hotel/');
    cy.getBySel('hotel-title').should('exist');
  });

  it('should visit country when clicking on hotel', () => {
    cy.visit('http://localhost:3000');
    cy.getBySel('search-input').type('uni');
    cy.getBySel('country-id', true).first().click();
    cy.url().should('include', '/country/');
    cy.getBySel('country-title').should('exist');
  });

  it('should visit city when clicking on hotel', () => {
    cy.visit('http://localhost:3000');
    cy.getBySel('search-input').type('a');
    cy.getBySel('city-id', true).first().click();
    cy.url().should('include', '/city/');
    cy.getBySel('city-title').should('exist');
  });
});