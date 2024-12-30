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
    cy.addBook();
    cy.search("poetry");
  });

  it("adds the book the shelf selected by the user", () => {
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

  it("only adds the same book once to the selected shelf", () => {
    const shelfId = SHELVES["WANT_TO_READ"].id;

    cy.addBookToShelf(0, shelfId);
    cy.addBookToShelf(0, shelfId);
    cy.closeSearch();

    const idSelector = `#${shelfId}`;
    cy.get(idSelector).find(".books-grid li").should("have.length", 1);
  });

  it("book can only be added to one shelf", () => {
    const sequence = [
      { ...SHELVES["WANT_TO_READ"], expectedCount: 0 },
      { ...SHELVES["CURRENTLY_READING"], expectedCount: 0 },
      { ...SHELVES["ALREADY_READ"], expectedCount: 1 },
    ];

    sequence.forEach((shelf) => {
      cy.addBookToShelf(0, shelf.id);
    });

    cy.closeSearch();

    sequence.forEach((shelf) => {
      const idSelector = `#${shelf.id}`;
      cy.get(idSelector)
        .find(".books-grid li")
        .should("have.length", shelf.expectedCount);
    });
  });
});
