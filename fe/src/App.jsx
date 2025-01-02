import "./App.css";
import { useState } from "react";
import { Bookshelf } from "./components/Bookshelf";
import { useBookshelves } from "./hooks/useBookshelves";
import { useBooks } from "./hooks/useBooks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Button } from "./components/Button";

function App() {
  const {
    getWantToReadBookshelf,
    getCurrentlyReadingBookshelf,
    getAlreadyReadBookshelf,
  } = useBookshelves();

  const { getWantToReadBooks, getCurrentlyReadingBooks, getAlreadyReadBooks } =
    useBooks(useLocalStorage());

  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <Button
              text="Close"
              className={"close-search"}
              onButtonClicked={() => setShowSearchpage(!showSearchPage)}
            />

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
                books={getWantToReadBooks()}
                bookshelf={getWantToReadBookshelf()}
              />
              <Bookshelf
                books={getCurrentlyReadingBooks()}
                bookshelf={getCurrentlyReadingBookshelf()}
              />
              <Bookshelf
                books={getAlreadyReadBooks()}
                bookshelf={getAlreadyReadBookshelf()}
              />
            </div>
          </div>
          <div className="open-search">
            <Button
              text="Add a book"
              onButtonClicked={() => setShowSearchpage(!showSearchPage)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
