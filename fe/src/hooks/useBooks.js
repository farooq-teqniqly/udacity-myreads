import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import {
  BOOKSHELF_WANT_TO_READ,
  BOOKSHELF_CURRENTLY_READING,
  BOOKSHELF_ALREADY_READ,
  BOOKSHELF_NONE,
} from "../data/bookshelfData";

export const useBooks = () => {
  const { loadBooks: loadFromLocalStorage, saveBooks: saveToLocalStorage } =
    useLocalStorage();

  const loadBooks = () => loadFromLocalStorage();

  const [books] = useState(() => loadBooks());

  const saveBooks = useCallback(
    () => saveToLocalStorage(books),
    [books, saveToLocalStorage]
  );

  useEffect(() => {
    saveBooks();
  }, [saveBooks]);

  const getBooksForShelf = (bookshelfId) =>
    books.filter((book) => book.bookshelfId === bookshelfId);

  const getWantToReadBooks = () => getBooksForShelf(BOOKSHELF_WANT_TO_READ);

  const getCurrentlyReadingBooks = () =>
    getBooksForShelf(BOOKSHELF_CURRENTLY_READING);

  const getAlreadyReadBooks = () => getBooksForShelf(BOOKSHELF_ALREADY_READ);

  const getNoneBookshelfBooks = () => getBooksForShelf(BOOKSHELF_NONE);

  return {
    getWantToReadBooks,
    getCurrentlyReadingBooks,
    getAlreadyReadBooks,
    getNoneBookshelfBooks,
  };
};
