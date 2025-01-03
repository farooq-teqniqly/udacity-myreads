import { useBookshelves } from "../../src/hooks/useBookshelves";

describe("Home Page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the bookshelves", () => {
    const { bookshelves, BOOKSHELF_NONE } = useBookshelves();

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
