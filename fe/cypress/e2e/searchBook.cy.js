import { verifyAllBookshelvesNotVisible } from "../support/helpers";

describe("search books", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.addBook();
  });

  it("shows the search form and not the bookshelves", () => {
    cy.get(".search-books-input-wrapper input")
      .should("be.visible")
      .should("have.attr", "placeholder", "Search by title, author, or ISBN");

    verifyAllBookshelvesNotVisible();
  });

  it("returns to the bookshelves when the close button is clicked", () => {
    cy.closeSearch();

    const bookshelves = ["Currently Reading", "Want to Read", "Read"];

    bookshelves.forEach((shelf) => {
      cy.get(".bookshelf-title")
        .filter((_, el) => el.textContent.trim() === shelf)
        .should("be.visible");
    });
  });

  it("can search for multiple topics", () => {
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

  it("can search, go back, and do the same search again", () => {
    cy.search("history");

    cy.get(".book").should("have.length", 20);

    cy.closeSearch();
    cy.addBook();
    cy.search("history");

    cy.get(".book").should("have.length", 20);
  });
});
