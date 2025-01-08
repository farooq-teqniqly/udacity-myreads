import PropTypes from "prop-types";
import { Book } from "./Book";
import { ShelfPropType } from "../propTypes";

export const Shelves = ({ shelves, onShelfChanged }) => {
  const makeFriendlyShelfName = (shelfName) => {
    let friendlyName = shelfName.replace(/([A-Z])/g, " $1").trim();
    return friendlyName[0].toUpperCase() + friendlyName.slice(1);
  };

  return (
    <>
      {Object.keys(shelves).map((shelf, index) => (
        <div key={index} className="bookshelf">
          <h2 className="bookshelf-title">{makeFriendlyShelfName(shelf)}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {shelves[shelf].map((book, index) => (
                <li key={index}>
                  <Book book={book} onShelfChanged={onShelfChanged} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </>
  );
};

Shelves.propTypes = {
  shelves: ShelfPropType,
  onShelfChanged: PropTypes.func.isRequired,
};
