describe("Search page tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.openSearch();
    cy.clearSearch();
  });

  it("displays a helpful message when first loaded", () => {
    cy.get(".search-books-message").should(
      "have.text",
      "Type a search term in the box above."
    );
  });

  it("goes to Home page when close search button is clicked", () => {
    cy.closeSearch();

    cy.get(".list-books-title h1")
      .should("be.visible")
      .should("have.text", "MyReads");
  });

  it("renders the books that were found", () => {
    cy.searchFor("poetry");
    cy.get(".book-cover").should("have.length", 20);
  });

  it("books in search results are not in a bookshelf", () => {
    cy.searchFor("poetry");

    cy.get(".book").each(($book) => {
      cy.wrap($book)
        .find(".book-shelf-changer select")
        .find("option#none")
        .should("contain.text", "✓");
    });
  });

  it("shows `No authors listed` for books with no authors", () => {
    cy.searchFor("football");

    cy.getBookByTitle("Football Kicking and Punting")
      .find(".book-authors")
      .should("have.text", "No authors listed");
  });

  it("shows multiple authors as comma separated string", () => {
    cy.searchFor("football");

    cy.getBookByTitle("The Origins and Development of Football in Ireland")
      .find(".book-authors")
      .should("have.text", "Richard M. Peter, Neal Garnham");
  });

  it("renders books with no cover image", () => {
    cy.searchFor("biography");

    cy.getBookByTitle("My First Life")
      .find(".book-cover")
      .should("have.css", "background-image")
      .and("include", "undefined");
  });

  it("changes the search results when the search term changes", () => {
    cy.searchFor("football");
    cy.getBookByTitle("Football Kicking and Punting").should("be.visible");
    cy.clearSearch();
    cy.searchFor("poetry");
    cy.getBookByTitle("The Hatred of Poetry").should("be.visible");
  });

  it("search results remain the same when input box cleared", () => {
    cy.searchFor("football");
    cy.getBookByTitle("Football Kicking and Punting").should("be.visible");
    cy.clearSearch();
    cy.getBookByTitle("Football Kicking and Punting").should("be.visible");
  });

  it("displays a message when no books are found", () => {
    cy.searchFor("xyz");
    cy.get(".book").should("not.exist");
    cy.get(".search-books-message").should(
      "have.text",
      "Your search yielded no results."
    );
  });
});
