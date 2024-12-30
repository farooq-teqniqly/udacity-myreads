import { useState } from "react";
import { SHELVES } from "../shelves";

export const useShelves = () => {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [alreadyRead, setAlreadyRead] = useState([]);

  const updateShelves = (selectedShelfId, selectedBook) => {
    setCurrentlyReading((prev) => prev.filter((b) => b.id !== selectedBook.id));
    setWantToRead((prev) => prev.filter((b) => b.id !== selectedBook.id));
    setAlreadyRead((prev) => prev.filter((b) => b.id !== selectedBook.id));

    switch (selectedShelfId) {
      case SHELVES["CURRENTLY_READING"].id:
        setCurrentlyReading((prev) => [...prev, selectedBook]);
        break;
      case SHELVES["WANT_TO_READ"].id:
        setWantToRead((prev) => [...prev, selectedBook]);
        break;
      case SHELVES["ALREADY_READ"].id:
        setAlreadyRead((prev) => [...prev, selectedBook]);
        break;
    }
  };

  const placeBook = (shelfId, book) => {
    updateShelves(shelfId, book);
  };

  const getShelf = (shelfId) => {
    switch (shelfId) {
      case SHELVES["WANT_TO_READ"].id:
        return wantToRead;
      case SHELVES["CURRENTLY_READING"].id:
        return currentlyReading;
      case SHELVES["ALREADY_READ"].id:
        return alreadyRead;
      default:
        throw new Error(`invalid shelfId: ${shelfId}`);
    }
  };

  return {
    placeBook,
    getShelf,
  };
};
