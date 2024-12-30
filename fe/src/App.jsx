import "./App.css";
import { useState } from "react";
import { Bookshelf } from "./components/Bookshelf";
import { SearchBook } from "./components/SearchBook";
import { SearchResults } from "./components/SearchResults";
import * as api from "./BooksAPI";
import { SHELVES } from "./shelves";

const App = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearchClose = () => {
    setShowSearchPage(!showSearchPage);
    setSearchResults([]);
    setQuery("");
  };

  const handleSearch = async (q) => {
    const trimmedQuery = q.trim();

    if (trimmedQuery === query) {
      return;
    }

    const res = await api.search(trimmedQuery);

    const books = res.map(({ id, title, authors, imageLinks }) => {
      return {
        id,
        title,
        authors,
        smallThumbnail: imageLinks.smallThumbnail,
      };
    });

    setSearchResults(books);
    setQuery(trimmedQuery);
  };

  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [alreadyRead, setAlreadyRead] = useState([]);

  const handleBookSelection = (shelfId, selectedBook) => {
    switch (shelfId) {
      case SHELVES["CURRENTLY_READING"].id:
        setCurrentlyReading((prev) => [...prev, selectedBook]);

        setWantToRead((prev) => {
          return prev.filter((b) => b.id !== selectedBook.id);
        });

        setAlreadyRead((prev) => {
          return prev.filter((b) => b.id !== selectedBook.id);
        });

        break;
      case SHELVES["WANT_TO_READ"].id:
        setWantToRead((prev) => [...prev, selectedBook]);

        setCurrentlyReading((prev) => {
          return prev.filter((b) => b.id !== selectedBook.id);
        });

        setAlreadyRead((prev) => {
          return prev.filter((b) => b.id !== selectedBook.id);
        });
        break;
      case SHELVES["ALREADY_READ"].id:
        setAlreadyRead((prev) => [...prev, selectedBook]);

        setWantToRead((prev) => {
          return prev.filter((b) => b.id !== selectedBook.id);
        });

        setCurrentlyReading((prev) => {
          return prev.filter((b) => b.id !== selectedBook.id);
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <SearchBook
            onClose={handleSearchClose}
            onSearch={(q) => handleSearch(q)}
          />
          <SearchResults
            results={searchResults}
            onBookSelected={handleBookSelection}
          />
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf
                id={SHELVES["CURRENTLY_READING"].id}
                label="Currently Reading"
                books={currentlyReading}
                onBookSelected={handleBookSelection}
              />
              <Bookshelf
                id={SHELVES["WANT_TO_READ"].id}
                label="Want to Read"
                books={wantToRead}
                onBookSelected={handleBookSelection}
              />
              <Bookshelf
                id={SHELVES["ALREADY_READ"].id}
                label="Read"
                books={alreadyRead}
                onBookSelected={handleBookSelection}
              />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchPage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
