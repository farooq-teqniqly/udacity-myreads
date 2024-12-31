import PropTypes from "prop-types";
import { useState } from "react";
import { useShelves } from "../hooks/useShelves";

export const Book = ({ book, onSelected }) => {
  const { title, smallThumbnail } = book;
  let authors = book.authors;

  if (!authors) {
    authors = ["No author listed"];
  }

  const [selectedShelf, setSelectedShelf] = useState("");

  const handleSelectedShelf = (shelfId, book) => {
    if (selectedShelf === shelfId) {
      return;
    }

    setSelectedShelf(shelfId);
    onSelected(shelfId, book);
  };

  const { getAllShelves } = useShelves();

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${smallThumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            defaultValue="separator"
            onChange={(e) => handleSelectedShelf(e.target.value, book)}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option value="separator" disabled>
              -----
            </option>
            {getAllShelves().map((shelf) => (
              <option key={shelf.id} value={shelf.id}>
                {shelf.label} {selectedShelf === shelf.id ? "✓" : ""}
              </option>
            ))}
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
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    smallThumbnail: PropTypes.string.isRequired,
  }),
  onSelected: PropTypes.func.isRequired,
};
