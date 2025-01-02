import * as bd from "../data/bookshelfData";

export const useBookshelves = () => {
  const getWantToReadBookshelf = () =>
    bd.bookshelves.filter((d) => d.id === bd.BOOKSHELF_WANT_TO_READ)[0];

  const getCurrentlyReadingBookshelf = () =>
    bd.bookshelves.filter((d) => d.id === bd.BOOKSHELF_CURRENTLY_READING)[0];

  const getAlreadyReadBookshelf = () =>
    bd.bookshelves.filter((d) => d.id === bd.BOOKSHELF_ALREADY_READ)[0];

  return {
    getWantToReadBookshelf,
    getCurrentlyReadingBookshelf,
    getAlreadyReadBookshelf,
  };
};
