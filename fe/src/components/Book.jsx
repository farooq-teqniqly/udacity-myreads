import PropTypes from "prop-types";
import { BookPropType } from "../propTypes";

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
            <option value="currentlyReading">
              Currently Reading{currentShelf === "currentlyReading" ? " ✓" : ""}
            </option>
            <option value="wantToRead">
              Want to Read{currentShelf === "wantToRead" ? " ✓" : ""}
            </option>
            <option value="alreadyRead">
              Already Read{currentShelf === "alreadyRead" ? " ✓" : ""}
            </option>
            <option value="none">
              None{currentShelf === "none" || !currentShelf ? " ✓" : ""}
            </option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
};

Book.propTypes = {
  book: BookPropType,
  onShelfChanged: PropTypes.func.isRequired,
};
