import PropTypes from "prop-types";
import { Book } from "./Book";
import { BookPropType, ShelfPropType } from "../propTypes";
import { useEffect, useRef } from "react";

export const Search = ({
  onClosed,
  onQueryChanged,
  searchResults,
  onShelfChanged,
  shelves,
  firstSearch,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={onClosed}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => onQueryChanged(e.target.value)}
            ref={inputRef}
          />
        </div>
      </div>
      <div className="search-books-results">
        {firstSearch ? (
          <h2>Type a category in the search box, i.e. &quot;Biography&quot;</h2>
        ) : searchResults.length === 0 ? (
          <h2>Your search yielded no results.</h2>
        ) : (
          <ol className="books-grid">
            {searchResults.map((book, index) => (
              <li key={index}>
                <Book
                  book={book}
                  onShelfChanged={onShelfChanged}
                  shelves={shelves}
                />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  onClosed: PropTypes.func.isRequired,
  onQueryChanged: PropTypes.func.isRequired,
  onShelfChanged: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(BookPropType),
  shelves: ShelfPropType,
  firstSearch: PropTypes.bool.isRequired,
};
