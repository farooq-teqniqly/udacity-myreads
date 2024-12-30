import PropTypes from "prop-types";
import { useState } from "react";

export const SearchBook = ({ onClose, onSearch }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={onClose}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <a
            id="search-book-button"
            onClick={() => {
              onSearch(query);
            }}
          >
            Search
          </a>
        </div>
      </div>
    </div>
  );
};

SearchBook.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
