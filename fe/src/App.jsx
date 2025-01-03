import "./App.css";
import { useEffect, useState } from "react";
import { Bookshelf } from "./components/Bookshelf";
import { useBookshelves } from "./hooks/useBookshelves";
import { useBooks } from "./hooks/useBooks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Button } from "./components/Button";
import { Search } from "./components/Search";
import { useDebounce } from "./hooks/useDebounce";
import { useBookSearch } from "./hooks/useBookSearch";
import { useAPI } from "./hooks/useAPI";
import { SearchResults } from "./components/SearchResults";

function App() {
  const {
    getWantToReadBookshelf,
    getCurrentlyReadingBookshelf,
    getAlreadyReadBookshelf,
    bookshelves,
  } = useBookshelves();

  const { getWantToReadBooks, getCurrentlyReadingBooks, getAlreadyReadBooks } =
    useBooks(useLocalStorage());

  const [showSearchPage, setShowSearchpage] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const { debouncedValue: debouncedSearchTerm } = useDebounce(searchTerm, 1000);
  const { search, searchResults, resultCount } = useBookSearch(useAPI());

  useEffect(() => {
    const debouncedSearch = async () => {
      if (debouncedSearchTerm) {
        await search(debouncedSearchTerm);
      }
    };

    debouncedSearch();
  }, [debouncedSearchTerm, search]);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <Search
            onClose={() => setShowSearchpage(false)}
            onSearchTermChanged={(term) => setSearchTerm(term)}
          />
          <div className="search-books-results">
            <SearchResults
              books={searchResults}
              bookshelves={bookshelves}
              resultCount={resultCount}
              onShelfChanged={() => {}}
            />
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
              onButtonClicked={() => setShowSearchpage(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
