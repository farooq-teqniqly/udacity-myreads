describe("Search page tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.openSearch();
  });

  it("goes to Home page when close search button is clicked", () => {
    cy.closeSearch();

    cy.get(".list-books-title h1")
      .should("be.visible")
      .should("have.text", "MyReads");
  });
});
