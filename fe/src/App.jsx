import "./App.css";
import { useState } from "react";
import { Bookshelf } from "./components/Bookshelf";
import { SearchBook } from "./components/SearchBook";

const App = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);

  const [currentlyReading] = useState([]);
  const [wantToRead] = useState([]);
  const [alreadyRead] = useState([]);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <SearchBook onClose={() => setShowSearchPage(!showSearchPage)} />
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
