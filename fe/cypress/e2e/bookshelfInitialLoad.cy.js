const verifyBooksInBookshelf = (bookshelfName, expectedBooks) => {
  cy.get(".bookshelf-title")
    .filter((_, el) => el.textContent.trim() === bookshelfName)
    .parent()
    .find(".books-grid li")
    .each(($el, index) => {
      const expectedBook = expectedBooks[index];
      cy.wrap($el).within(() => {
        cy.get(".book-title").should("contain", expectedBook.title);
        cy.get(".book-authors").should("contain", expectedBook.author);
      });
    });
};

describe("`Bookshelf initial load", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the `Currently Reading` bookshelf", () => {
    const currentlyReadingBooks = [
      { title: "To Kill a Mockingbird", author: "Harper Lee" },
      { title: "Ender's Game", author: "Orson Scott Card" },
    ];
    verifyBooksInBookshelf("Currently Reading", currentlyReadingBooks);
  });

  it("should display the `Want to Read` bookshelf", () => {
    const wantToReadBooks = [
      { title: "1776", author: "David McCullough" },
      {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
      },
    ];
    verifyBooksInBookshelf("Want to Read", wantToReadBooks);
  });

  it("should display the `Read` bookshelf", () => {
    const readBooks = [
      { title: "The Hobbit", author: "J.R.R. Tolkien" },
      {
        title: "Oh, the Places You'll Go!",
        author: "Seuss",
      },
      {
        title: "The Adventures of Tom Sawyer",
        author: "Mark Twain",
      },
    ];
    verifyBooksInBookshelf("Read", readBooks);
  });
});
