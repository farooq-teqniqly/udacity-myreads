import "./App.css";
import { Bookshelf } from "./components/Bookshelf";
import { SearchBook } from "./components/SearchBook";
import { SearchResults } from "./components/SearchResults";
import { SHELVES } from "./shelves";
import { useShelves } from "./hooks/useShelves";
import { useSearch } from "./hooks/useSearch";

const App = () => {
  const { placeBook, getShelf } = useShelves();

  const {
    showSearchPage,
    searchResults,
    search,
    closeSearch,
    openSearch,
    showNoResultsMessage,
  } = useSearch();

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <SearchBook onClose={closeSearch} onSearch={(q) => search(q)} />
          <SearchResults
            results={searchResults}
            onBookSelected={placeBook}
            showNoResultsMessage={showNoResultsMessage}
          />
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {Object.values(SHELVES).map((shelf) => (
                <Bookshelf
                  key={shelf.id}
                  id={shelf.id}
                  label={shelf.label}
                  books={getShelf(shelf.id)}
                  onBookSelected={placeBook}
                />
              ))}
            </div>
          </div>
          <div className="open-search">
            <a onClick={openSearch}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
