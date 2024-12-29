export const verifyEmptyBookshelf = (bookshelfName) => {
  cy.get(".bookshelf-title")
    .filter((_, el) => el.textContent.trim() === bookshelfName)
    .parent()
    .find(".books-grid li")
    .should("have.length", 0);
};

export const verifyAllBookshelvesNotVisible = () => {
  cy.get("body").should("not.have.class", ".bookshelf-title");
};
