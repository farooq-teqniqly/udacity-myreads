describe("shelves view", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the title", () => {
    cy.get(".list-books-title").should("have.text", "MyReads");
  });

  it("renders the bookshelves without any books", () => {
    const shelves = ["Want To Read", "Currently Reading", "Already Read"];

    shelves.forEach((shelf, index) => {
      cy.get(".bookshelf-title").eq(index).should("have.text", shelf);
    });

    cy.get(".bookshelf").each((shelf) => {
      cy.wrap(shelf).find("li").should("not.exist");
    });
  });

  it("renders the search button", () => {
    cy.get(".open-search").should("be.visible");
  });
});
