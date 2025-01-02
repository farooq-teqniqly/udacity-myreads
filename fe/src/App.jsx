import "./App.css";
import { useState } from "react";
import { Bookshelf } from "./components/Bookshelf";
import * as bookshelfData from "./data/bookshelfData";
import {
  BOOKSHELF_ALREADY_READ,
  BOOKSHELF_CURRENTLY_READING,
  BOOKSHELF_WANT_TO_READ,
} from "./data/bookshelfData";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf
                books={[]}
                bookshelf={
                  bookshelfData.bookshelves.filter(
                    (d) => d.id === BOOKSHELF_WANT_TO_READ
                  )[0]
                }
              />

              <Bookshelf
                books={[]}
                bookshelf={
                  bookshelfData.bookshelves.filter(
                    (d) => d.id === BOOKSHELF_CURRENTLY_READING
                  )[0]
                }
              />

              <Bookshelf
                books={[]}
                bookshelf={
                  bookshelfData.bookshelves.filter(
                    (d) => d.id === BOOKSHELF_ALREADY_READ
                  )[0]
                }
              />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
