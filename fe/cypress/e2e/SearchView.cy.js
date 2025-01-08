describe("Search view", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.openSearch();
  });

  it("goes to the Shelves view when close button is clicked", () => {
    cy.get(".close-search").click();
    cy.get(".list-books-title").should("be.visible");
  });
});
