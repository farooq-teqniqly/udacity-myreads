const verifyEmptyBookshelf = (bookshelfName) => {
  cy.get(".bookshelf-title")
    .filter((_, el) => el.textContent.trim() === bookshelfName)
    .parent()
    .find(".books-grid li")
    .should("have.length", 0);
};

describe("`Bookshelf initial load", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should not display any books", () => {
    verifyEmptyBookshelf("Currently Reading");
    verifyEmptyBookshelf("Want to Read");
    verifyEmptyBookshelf("Read");
  });
});
