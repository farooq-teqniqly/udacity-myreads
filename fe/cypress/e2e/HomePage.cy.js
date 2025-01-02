import { bookshelves, BOOKSHELF_NONE } from "../../src/data/bookshelfData";

describe("Home Page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the bookshelves", () => {
    bookshelves.forEach((bookshelf) => {
      if (bookshelf.id !== BOOKSHELF_NONE) {
        const idSelector = `#${bookshelf.id}`;

        cy.get(idSelector)
          .should("be.visible")
          .should("have.text", bookshelf.title);
      }
    });
  });

  it("opens search page when the open search button is clicked", () => {
    cy.openSearch();
    cy.get(".search-books-input-wrapper input").should("be.visible");
  });
});
