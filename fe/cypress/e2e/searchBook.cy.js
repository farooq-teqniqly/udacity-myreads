describe("search books", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("returns the books in search results", () => {
    cy.addBook();
    cy.get("input").clear();
    cy.get("input").type("history");

    cy.get("#search-book-button").click();

    cy.get(".book").should("have.length", 20);
  });
});
