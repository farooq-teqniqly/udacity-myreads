import { useCallback, useEffect, useState } from "react";
import { SHELVES } from "../shelves";

const loadShelf = (shelfId) => JSON.parse(localStorage.getItem(shelfId)) || [];

export const useShelves = () => {
  const [currentlyReading, setCurrentlyReading] = useState(
    loadShelf(SHELVES["CURRENTLY_READING"].id)
  );

  const [wantToRead, setWantToRead] = useState(
    loadShelf(SHELVES["WANT_TO_READ"].id)
  );

  const [alreadyRead, setAlreadyRead] = useState(
    loadShelf(SHELVES["ALREADY_READ"].id)
  );

  const saveShelves = useCallback(() => {
    localStorage.setItem(
      SHELVES["CURRENTLY_READING"].id,
      JSON.stringify(currentlyReading)
    );

    localStorage.setItem(
      SHELVES["WANT_TO_READ"].id,
      JSON.stringify(wantToRead)
    );

    localStorage.setItem(
      SHELVES["ALREADY_READ"].id,
      JSON.stringify(alreadyRead)
    );
  }, [currentlyReading, wantToRead, alreadyRead]);

  useEffect(() => {
    saveShelves();
  }, [saveShelves]);

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

  const getAllShelves = () => Object.values(SHELVES);

  return {
    placeBook,
    getShelf,
    getAllShelves,
  };
};
