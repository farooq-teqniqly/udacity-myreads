import "./App.css";
import { useState } from "react";
import { Bookshelf } from "./components/Bookshelf";
import { SearchBook } from "./components/SearchBook";
import { SearchResults } from "./components/SearchResults";
import * as api from "./BooksAPI";

const App = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [currentlyReading] = useState([]);
  const [wantToRead] = useState([]);
  const [alreadyRead] = useState([]);

  const handleSearchClose = () => {
    setShowSearchPage(!showSearchPage);
    setSearchResults([]);
  };

  const handleSearch = async (query) => {
    const res = await api.search(query);

    const books = res.map(({ id, title, authors, imageLinks }) => {
      return {
        id,
        title,
        authors,
        smallThumbnail: imageLinks.smallThumbnail,
      };
    });

    setSearchResults(books);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <SearchBook
            onClose={handleSearchClose}
            onSearch={(query) => handleSearch(query)}
          />
          <SearchResults results={searchResults} />
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf label="Currently Reading" books={currentlyReading} />
              <Bookshelf label="Want to Read" books={wantToRead} />
              <Bookshelf label="Read" books={alreadyRead} />
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
