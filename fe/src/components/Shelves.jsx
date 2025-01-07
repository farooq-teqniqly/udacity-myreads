import { useEffect, useState } from "react";
import { Book } from "./Book";

export const Shelves = () => {
  const [shelves, setShelves] = useState({
    wantToRead: [],
    currentlyReading: [],
    alreadyRead: [],
  });

  useEffect(() => {
    const savedShelves = JSON.parse(localStorage.getItem("shelves")) || {
      wantToRead: [],
      currentlyReading: [],
      alreadyRead: [],
    };

    setShelves(savedShelves);
  }, []);

  const makeFriendlyShelfName = (shelfName) => {
    let friendlyName = shelfName.replace(/([A-Z])/g, " $1").trim();
    return friendlyName[0].toUpperCase() + friendlyName.slice(1);
  };

  const onShelfChanged = (book, newShelf) => {
    console.log({ book, newShelf });
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
