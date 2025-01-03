import * as bd from "../data/bookshelfData";
import { isValidBookshelf } from "../data/bookshelfData";

export const useBookshelves = () => {
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
