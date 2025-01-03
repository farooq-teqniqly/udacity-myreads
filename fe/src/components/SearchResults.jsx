import PropTypes from "prop-types";
import { BookPropType, BookshelfPropType } from "../prop-types/propTypes";
import { Book } from "./Book";

export const SearchResults = ({
  books,
  bookshelves,
  onShelfChanged,
  resultCount,
}) => {
  if (resultCount === null) {
    return (
      <h3 className="search-books-message">
        Type a search term in the box above.
      </h3>
    );
  }

  if (resultCount === 0) {
    return (
      <h3 className="search-books-message">Your search yielded no results.</h3>
    );
  }
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book
            book={book}
            bookshelves={bookshelves}
            onShelfChanged={onShelfChanged}
          />
        </li>
      ))}
    </ol>
  );
};

SearchResults.propTypes = {
  books: PropTypes.arrayOf(BookPropType).isRequired,
  bookshelves: PropTypes.arrayOf(BookshelfPropType.isRequired).isRequired,
  onShelfChanged: PropTypes.func.isRequired,
  resultCount: PropTypes.number,
};
