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
    isValidBookshelf,
  } = useBookshelves();

  const getBooksForShelf = (bookshelfId) => {
    if (!isValidBookshelf(bookshelfId)) {
      throw new Error(`invalid bookshelf id: ${bookshelfId}`);
    }

    return books.filter((book) => book.bookshelfId === bookshelfId);
  };

  const bookFunctions = {
    wantToRead: () => getBooksForShelf(BOOKSHELF_WANT_TO_READ),
    currentlyReading: () => getBooksForShelf(BOOKSHELF_CURRENTLY_READING),
    alreadyRead: () => getBooksForShelf(BOOKSHELF_ALREADY_READ),
    none: () => getBooksForShelf(BOOKSHELF_NONE),
  };

  return {
    getWantToReadBooks: bookFunctions.wantToRead,
    getCurrentlyReadingBooks: bookFunctions.currentlyReading,
    getAlreadyReadBooks: bookFunctions.alreadyRead,
    getNoneBookshelfBooks: bookFunctions.none,
  };
};
