describe('HomePage', () => {
  beforeEach(() => {
    // Preserve the session to avoid logging in before each test
    cy.session('user', () => {
      cy.login('demo@gmail.com', 'demo1234');
    });

    cy.visit('http://localhost:5173/');
  });

  it('renders the home page with essential elements', () => {
    cy.get('[data-testid="home-page"]').should('exist');
    cy.get('[data-testid="listing-filters"]').should('exist');
    cy.get('[data-testid="listing-list"]').should('exist');
  });

  it('displays the correct number of listings', () => {
    const expectedListingsCount = 12;

    cy.get('[data-testid="listing-list"] > *').should(
      'have.length',
      expectedListingsCount,
    );
  });

  it('filters listings correctly', () => {
    cy.get('[data-testid="listing-filters"] input[name="search"]').type(
      'Paris',
    );
    cy.get('[data-testid="listing-filters-submit"]').click();

    cy.get('[data-testid="listing-list"] > *').should('have.length', 6);

    // Increment the guests filter to 16
    for (let i = 0; i < 16; i++) {
      cy.get('[data-testid="stepper-increment"]').click();
    }

    cy.get('[data-testid="listing-filters-submit"]').click();

    cy.get('[data-testid="listing-list"] > *').should('have.length', 1);
  });

  it('handles no results scenario', () => {
    // Enter a search term that should return no results
    cy.get('[data-testid="listing-filters"] input[name="search"]').type(
      'NonexistentListing123456',
    );

    cy.get('[data-testid="listing-filters-submit"]').click();

    cy.get('[data-testid="listing-list"]').should('not.exist');
    cy.contains('No listings found').should('be.visible');
  });
});
