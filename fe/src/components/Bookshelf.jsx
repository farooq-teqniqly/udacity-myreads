import PropTypes from "prop-types";
import { BookPropType, BookshelfPropType } from "../prop-types/propTypes";
import { Book } from "./Book";
import { bookshelves } from "../data/bookshelfData";

export const Bookshelf = (books, bookshelf) => {
  return (
    <div className="bookshelf">
      <h2 id={bookshelf.id} className="bookshelf-title">
        {bookshelf.title}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              bookshelves={bookshelves}
              /* eslint-disable-next-line no-unused-vars */
              onShelfChanged={(newShelfId, bookId) => {}}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(BookPropType).isRequired,
  bookshelf: BookshelfPropType.isRequired,
};
