import { shelves } from "../support/testData";

describe("Persist books to local storage", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.addBook();
    cy.search("poetry");
  });

  it("books persist between page refreshes", () => {
    shelves.forEach((shelf, index) => {
      cy.addBookToShelf(index, shelf.id);
    });

    cy.closeSearch();
    cy.reload();

    shelves.forEach((shelf) => {
      const idSelector = `#${shelf.id}`;
      cy.get(idSelector).find(".books-grid li").should("be.visible");
    });
  });
});
