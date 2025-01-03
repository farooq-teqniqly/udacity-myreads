import * as bd from "../data/bookshelfData";
import {
  BOOKSHELF_ALREADY_READ,
  BOOKSHELF_CURRENTLY_READING,
  BOOKSHELF_NONE,
  BOOKSHELF_WANT_TO_READ,
} from "../data/bookshelfData";

export const useBookshelves = () => {
  const isValidBookshelf = (bookshelfId) => {
    return [
      BOOKSHELF_WANT_TO_READ,
      BOOKSHELF_CURRENTLY_READING,
      BOOKSHELF_ALREADY_READ,
      BOOKSHELF_NONE,
    ].includes(bookshelfId);
  };

  const getBookshelf = (bookshelfId) => {
    if (!isValidBookshelf(bookshelfId)) {
      throw new Error(`invalid bookshelf id: ${bookshelfId}`);
    }

    return bd.bookshelves.filter((d) => d.id === bookshelfId)[0];
  };

  const getWantToReadBookshelf = () => getBookshelf(bd.BOOKSHELF_WANT_TO_READ);

  const getCurrentlyReadingBookshelf = () =>
    getBookshelf(bd.BOOKSHELF_CURRENTLY_READING);

  const getAlreadyReadBookshelf = () => getBookshelf(bd.BOOKSHELF_ALREADY_READ);

  return {
    getWantToReadBookshelf,
    getCurrentlyReadingBookshelf,
    getAlreadyReadBookshelf,
  };
};
