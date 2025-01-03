import { useCallback, useEffect, useState } from "react";
import { useBookshelves } from "./useBookshelves";

export const useBooks = (bookRepository) => {
  if (!bookRepository) {
    throw new Error("provide a book repository to the useBooks hook");
  }

  const loadBooks = () => bookRepository.loadBooks();

  const [books] = useState(() => loadBooks());

  const saveBooks = useCallback(
    () => bookRepository.saveBooks(books),
    [books, bookRepository]
  );

  useEffect(() => {
    saveBooks();
  }, [saveBooks]);

  const {
    BOOKSHELF_WANT_TO_READ,
    BOOKSHELF_CURRENTLY_READING,
    BOOKSHELF_ALREADY_READ,
    BOOKSHELF_NONE,
  } = useBookshelves();

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
