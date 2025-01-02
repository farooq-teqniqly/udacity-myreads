import { useCallback, useEffect, useState } from "react";
import {
  BOOKSHELF_WANT_TO_READ,
  BOOKSHELF_CURRENTLY_READING,
  BOOKSHELF_ALREADY_READ,
  BOOKSHELF_NONE,
} from "../data/bookshelfData";

const LOCAL_STORAGE_KEY = "myreads-books";

export const useBooks = () => {
  const loadBooks = () =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

  const [books] = useState(() => loadBooks());

  const saveBooks = useCallback(
    () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books)),
    [books]
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
