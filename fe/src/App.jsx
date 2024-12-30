import "./App.css";
import { useState } from "react";
import { Bookshelf } from "./components/Bookshelf";
import { SearchBook } from "./components/SearchBook";
import { SearchResults } from "./components/SearchResults";
import * as api from "./BooksAPI";
import { SHELVES } from "./shelves";
import { useShelves } from "./hooks/useShelves";

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

  const { placeBook, getShelf } = useShelves();

  const handleBookSelection = (selectedShelfId, selectedBook) => {
    placeBook(selectedShelfId, selectedBook);
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
                books={getShelf(SHELVES["CURRENTLY_READING"].id)}
                onBookSelected={handleBookSelection}
              />
              <Bookshelf
                id={SHELVES["WANT_TO_READ"].id}
                label="Want to Read"
                books={getShelf(SHELVES["WANT_TO_READ"].id)}
                onBookSelected={handleBookSelection}
              />
              <Bookshelf
                id={SHELVES["ALREADY_READ"].id}
                label="Read"
                books={getShelf(SHELVES["ALREADY_READ"].id)}
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
