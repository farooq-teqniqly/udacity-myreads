import PropTypes from "prop-types";
import { Book } from "./Book";

export const Bookshelf = ({ label, books, onBookSelected, id }) => {
  return (
    <div id={id} className="bookshelf">
      <h2 className="bookshelf-title">{label}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book book={book} onSelected={onBookSelected}></Book>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string),
      smallThumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBookSelected: PropTypes.func.isRequired,
};
