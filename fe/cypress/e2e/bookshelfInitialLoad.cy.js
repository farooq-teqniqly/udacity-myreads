import { verifyEmptyBookshelf } from "../support/helpers";

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
