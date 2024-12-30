import "./App.css";
import { useState } from "react";
import { Bookshelf } from "./components/Bookshelf";
import { SearchBook } from "./components/SearchBook";
import { SearchResults } from "./components/SearchResults";
import * as api from "./BooksAPI";

const App = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearchClose = () => {
    setShowSearchPage(!showSearchPage);
    setSearchResults([]);
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
      case "CURRENTLY_READING":
        setCurrentlyReading((prev) => [...prev, selectedBook]);
        break;
      case "WANT_TO_READ":
        setWantToRead((prev) => [...prev, selectedBook]);
        break;
      case "ALREADY_READ":
        setAlreadyRead((prev) => [...prev, selectedBook]);
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
                label="Currently Reading"
                books={currentlyReading}
                onBookSelected={handleBookSelection}
              />
              <Bookshelf
                label="Want to Read"
                books={wantToRead}
                onBookSelected={handleBookSelection}
              />
              <Bookshelf
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
