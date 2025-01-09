describe("shelves view", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the title", () => {
    cy.get(".list-books-title").should("have.text", "MyReads");
  });

  it("renders the bookshelves with default books", () => {
    const shelves = [
      {
        name: "Want To Read",
        books: ["The Cuckoo's Calling", "Lords of Finance"],
      },
      {
        name: "Currently Reading",
        books: [
          "The Linux Command Line",
          "Learning Web Development with React and Bootstrap",
        ],
      },
      {
        name: "Already Read",
        books: ["Needful Things", "React", "Satire TV"],
      },
    ];

    shelves.forEach((shelf) => {
      cy.contains(".bookshelf-title", shelf.name)
        .parents(".bookshelf")
        .find(".books-grid .book-title")
        .then((titles) => {
          const bookTitles = [...titles].map((t) => t.innerText);

          expect(bookTitles).to.deep.equal(shelf.books);
        });
    });
  });

  it("renders the search button", () => {
    cy.get(".open-search").should("be.visible");
  });

  it("opens search view when search button is clicked", () => {
    cy.openSearch();
    cy.get(".search-books-input-wrapper input").should("be.visible");
  });

  it("retains the shelved books on refresh", () => {
    const shelves = [
      {
        name: "Want To Read",
        books: ["The Cuckoo's Calling", "Lords of Finance"],
      },
      {
        name: "Currently Reading",
        books: [
          "The Linux Command Line",
          "Learning Web Development with React and Bootstrap",
        ],
      },
      {
        name: "Already Read",
        books: ["Needful Things", "React", "Satire TV"],
      },
    ];

    cy.reload();

    shelves.forEach((shelf) => {
      cy.contains(".bookshelf-title", shelf.name)
        .parents(".bookshelf")
        .find(".books-grid .book-title")
        .then((titles) => {
          const bookTitles = [...titles].map((t) => t.innerText);

          expect(bookTitles).to.deep.equal(shelf.books);
        });
    });
  });
});
