import PropTypes from "prop-types";

export const SearchBook = ({ onClose }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={onClose}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
    </div>
  );
};

SearchBook.propTypes = {
  onClose: PropTypes.func.isRequired,
};
