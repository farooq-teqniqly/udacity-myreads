describe("end-to-end scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.openSearch();
  });

  describe("from search view", () => {
    it("add books to shelves from the search view", () => {
      const bookshelfMap = [
        { title: "Advent", shelf: "Want To Read", query: "mystery" },
        {
          title: "American Horrors",
          shelf: "Currently Reading",
          query: "horror",
        },
        {
          title: "Blue Collar Mentality",
          shelf: "Already Read",
          query: "football",
        },
      ];

      bookshelfMap.forEach((item) => {
        cy.doSearch(item.query);
        cy.selectBookByTitle(item.title).addToShelf(item.shelf);
        cy.clearSearch();
      });

      cy.closeSearch();

      bookshelfMap.forEach((item) => {
        cy.get(".bookshelf")
          .contains(".bookshelf-title", item.shelf)
          .closest(".bookshelf")
          .find(".books-grid li")
          .should("contain.text", item.title);
      });
    });

    it("will not add the same book to the same shelf twice", () => {
      const shelf = "Want To Read";
      const shelfOptionValue = "wantToRead";

      cy.doSearch("baseball");
      cy.selectBookByTitle("Lefty O'Doul").addToShelf(shelfOptionValue);
      cy.selectBookByTitle("Lefty O'Doul").addToShelf(shelfOptionValue);
      cy.selectBookByTitle("Lefty O'Doul").addToShelf(shelfOptionValue);
      cy.closeSearch();

      cy.getBookshelf(shelf).find(".books-grid li").should("have.length", 3);
    });
  });

  describe("from the shelf view", () => {
    // it("lets the user move books to different shelves", () => {
    //   const query = "Business";
    //   const title = "The Halo Effect";
    //
    //   const sequence = [
    //     { shelf: "Want To Read", finalBookCount: 3 },
    //     { shelf: "Currently Reading", finalBookCount: 3 },
    //     { shelf: "Already Read", finalBookCount: 4 },
    //   ];
    //
    //   cy.doSearch(query);
    //   cy.selectBookByTitle(title).addToShelf(sequence[0].shelf);
    //   cy.closeSearch();
    //
    //   sequence.forEach((seq, index) => {
    //     if (index !== 0) {
    //       cy.selectBookByTitle(title).addToShelf(seq.shelf);
    //
    //       cy.selectBookByTitle(title)
    //         .get("option")
    //         .should("contain.text", `${seq.shelf} ✓`);
    //
    //       cy.getBookshelf(seq.shelf)
    //         .find(".books-grid li")
    //         .should("have.length", seq.finalBookCount);
    //
    //       cy.getBookshelf(sequence[index - 1])
    //         .find(".books-grid li")
    //         .should("have.length", sequence[index - 1].finalBookCount - 1);
    //     }
    //   });
    // });

    // it("removes the book when `none` is selected", () => {
    //   const query = "poetry";
    //   const title = "Paradise Lost";
    //   const shelves = ["Want To Read", "Currently Reading", "Already Read"];
    //
    //   cy.doSearch(query);
    //   cy.selectBookByTitle(title).addToShelf(shelves[0]);
    //   cy.closeSearch();
    //   cy.selectBookByTitle(title).addToShelf("None");
    //
    //   shelves.forEach((shelf) => {
    //     cy.getBookshelf(shelf).find(".books-grid li").should("not.exist");
    //   });
    // });

    // it("doesn't move the book when the same shelf is selected", () => {
    //   const query = "poetry";
    //   const title = "Paradise Lost";
    //   const shelves = ["Want To Read", "Currently Reading", "Already Read"];
    //   const wantToReadOptionValue = "wantToRead";
    //
    //   cy.doSearch(query);
    //   cy.selectBookByTitle(title).addToShelf(shelves[0]);
    //   cy.closeSearch();
    //
    //   cy.selectBookByTitle(title).addToShelf(wantToReadOptionValue);
    //   cy.selectBookByTitle(title).addToShelf(wantToReadOptionValue);
    //
    //   cy.getBookshelf(shelves[0])
    //     .find(".books-grid li")
    //     .should("have.length", 1);
    //
    //   shelves.slice(1).forEach((shelf) => {
    //     cy.getBookshelf(shelf).find(".books-grid li").should("not.exist");
    //   });
    // });

    it("for books in s shelf, it shows the correct shelf on the search page", () => {
      const query = "poetry";
      const title = "Paradise Lost";
      const shelf = "Want To Read";
      const wantToReadOptionValue = "wantToRead";

      cy.doSearch(query);
      cy.selectBookByTitle(title).addToShelf(shelf);
      cy.closeSearch();

      cy.selectBookByTitle(title);
      cy.openSearch();
      cy.doSearch(query);

      cy.selectBookByTitle(title)
        .find("select")
        .find(`option[value="${wantToReadOptionValue}"]`)
        .should("contain.text", "✓");
    });

    it("preserves books when book is moved and browser refreshed", () => {
      cy.closeSearch();

      const title = "Lords of Finance";
      cy.selectBookByTitle(title).addToShelf("Currently Reading");

      cy.selectBookByTitle(title)
        .closest(".bookshelf")
        .find(".bookshelf-title")
        .should("have.text", "Currently Reading");

      cy.reload();

      cy.selectBookByTitle(title)
        .closest(".bookshelf")
        .find(".bookshelf-title")
        .should("have.text", "Currently Reading");
    });
  });
});
