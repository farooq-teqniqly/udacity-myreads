describe("search books", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("returns the books in search results", () => {
    cy.addBook();
    cy.search("history");

    cy.get(".book").should("have.length", 20);

    cy.get(".book-title")
      .first()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(
          "The Book in History, the Book as History"
        );
      });

    cy.search("poetry");

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(2000);

    cy.get(".book").should("have.length", 20);

    cy.get(".book-title")
      .first()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("The Hatred of Poetry");
      });
  });
});
