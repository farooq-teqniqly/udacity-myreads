import PropTypes from "prop-types";

export const Search = ({ onClosed }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={onClosed}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  );
};

Search.propTypes = {
  onClosed: PropTypes.func.isRequired,
};
