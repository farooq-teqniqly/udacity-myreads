describe("Search view", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.openSearch();
    cy.clearSearch();
  });

  it("goes to the Shelves view when close button is clicked", () => {
    cy.closeSearch();
    cy.get(".list-books-title").should("be.visible");
  });

  it("query is cleared when the close button is clicked and search reopened", () => {
    cy.doSearch("biography");
    cy.closeSearch();
    cy.get(".list-books-title").should("be.visible");
    cy.openSearch();
    cy.get(".search-books-input-wrapper input").should("have.text", "");
  });

  it("displays the search results", () => {
    cy.doSearch("business");
    cy.get(".book").should("have.length", 20);

    cy.get(".book").each(($book) => {
      cy.wrap($book).within(() => {
        cy.get(".book-title").should("be.visible");
        cy.get(".book-authors").should("be.visible");
        cy.get(".book-cover").should("be.visible");
        cy.get(".book-shelf-changer").should("be.visible");
      });
    });
  });

  it("displays the shelf dropdown for each book and `none` is selected by default", () => {
    const expectedOptions = [
      "Move to...",
      "Currently Reading",
      "Want To Read",
      "Already Read",
      "None ✓",
    ];

    cy.doSearch("business");

    cy.get(".book").each(($book) => {
      cy.wrap($book).within(() => {
        cy.get("select")
          .find("option")
          .each(($option, index) => {
            cy.wrap($option).should("have.text", expectedOptions[index]);
          });
      });
    });
  });

  it("formats multiple authors as a comma separated string", () => {
    cy.doSearch("football");

    cy.selectBookByTitle(
      "The Origins and Development of Football in Ireland"
    ).verifyBookAuthors("Richard M. Peter, Neal Garnham");
  });

  it("displays `No authors listed` when book has no authors", () => {
    cy.doSearch("football");

    cy.selectBookByTitle("Football Kicking and Punting").verifyBookAuthors(
      "No authors listed"
    );
  });

  it("displays no image for books without a thumbnail", () => {
    cy.doSearch("bio");

    cy.selectBookByTitle("My First Life")
      .find(".book-cover")
      .should("have.css", "background-image")
      .and("include", "undefined");
  });
});
