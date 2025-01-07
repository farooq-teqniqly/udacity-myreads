import PropTypes from "prop-types";

export const Book = ({ book, onShelfChanged }) => {
  const { imageUrl, title, authors, currentShelf } = book;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={(e) => onShelfChanged(book, e.target.value)}
            value={currentShelf || "none"}
          >
            <option value="moveTo" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="alreadyRead">Already Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string,
    currentShelf: PropTypes.string,
  }).isRequired,
  onShelfChanged: PropTypes.func.isRequired,
};
