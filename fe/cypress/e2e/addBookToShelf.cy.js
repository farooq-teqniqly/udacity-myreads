import { SHELVES } from "../../src/shelves";

const shelves = [
  {
    id: SHELVES["CURRENTLY_READING"].id,
    label: SHELVES["CURRENTLY_READING"].label,
    title: "The Hatred of Poetry",
  },
  {
    id: SHELVES["WANT_TO_READ"].id,
    label: SHELVES["WANT_TO_READ"].label,
    title: "A Poetry Handbook",
  },
  {
    id: SHELVES["ALREADY_READ"].id,
    label: SHELVES["ALREADY_READ"].label,
    title: "Pattern Poetry",
  },
];

describe("add books to shelves", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds the book the right shelf", () => {
    cy.addBook();
    cy.search("poetry");

    shelves.forEach((shelf, index) => {
      cy.addBookToShelf(index, shelf.id);
    });

    cy.closeSearch();

    shelves.forEach((shelf) => {
      const idSelector = `#${shelf.id}`;
      cy.get(idSelector)
        .find(".books-grid li")
        .should(($books) => {
          expect($books).to.have.length(1);
          expect($books.find(".book-title").text()).to.equal(shelf.title);
        });
    });
  });
});
