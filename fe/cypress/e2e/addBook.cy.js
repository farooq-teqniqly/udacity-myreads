import { verifyAllBookshelvesNotVisible } from "../support/helpers";

describe("Add a book", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the search form and not the bookshelves", () => {
    cy.addBook();

    cy.get(".search-books-input-wrapper input")
      .should("be.visible")
      .should("have.attr", "placeholder", "Search by title, author, or ISBN");

    verifyAllBookshelvesNotVisible();
  });

  it("returns to the bookshelves when the close button is clicked", () => {
    cy.addBook();
    cy.closeSearch();

    const bookshelves = ["Currently Reading", "Want to Read", "Read"];

    bookshelves.forEach((shelf) => {
      cy.get(".bookshelf-title")
        .filter((_, el) => el.textContent.trim() === shelf)
        .should("be.visible");
    });
  });
});
