import PropTypes from "prop-types";
import { Book } from "./Book";
import { ShelfPropType } from "../propTypes";
import { makeFriendlyShelfName } from "../helpers";

export const Shelves = ({ shelves, onShelfChanged }) => {
  return (
    <>
      {Object.keys(shelves).map((shelf, index) => (
        <div key={index} className="bookshelf">
          <h2 className="bookshelf-title">{makeFriendlyShelfName(shelf)}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {shelves[shelf].map((book, index) => (
                <li key={index}>
                  <Book
                    book={book}
                    onShelfChanged={onShelfChanged}
                    shelves={shelves}
                  />
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
