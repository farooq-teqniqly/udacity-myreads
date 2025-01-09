import PropTypes from "prop-types";
import { BookPropType, ShelfPropType } from "../propTypes";
import { makeFriendlyShelfName } from "../helpers";

export const Book = ({ book, onShelfChanged, shelves }) => {
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
            {Object.keys(shelves).map((shelf, index) => (
              <option key={index} value={shelf}>
                {makeFriendlyShelfName(shelf)}
                {currentShelf === shelf ? " ✓" : ""}
              </option>
            ))}
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
  shelves: ShelfPropType,
};
