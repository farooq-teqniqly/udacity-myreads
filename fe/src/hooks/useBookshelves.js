const BOOKSHELF_WANT_TO_READ = "want-to-read";
const BOOKSHELF_CURRENTLY_READING = "currently-reading";
const BOOKSHELF_ALREADY_READ = "already-read";
const BOOKSHELF_NONE = "none";

const bookshelves = [
  {
    id: BOOKSHELF_WANT_TO_READ,
    title: "Want to Read",
  },
  {
    id: BOOKSHELF_CURRENTLY_READING,
    title: "Currently Reading",
  },
  {
    id: BOOKSHELF_ALREADY_READ,
    title: "Read",
  },
  {
    id: BOOKSHELF_NONE,
    title: "None",
  },
];

export const isValidBookshelf = (bookshelfId) => {
  return [
    BOOKSHELF_WANT_TO_READ,
    BOOKSHELF_CURRENTLY_READING,
    BOOKSHELF_ALREADY_READ,
    BOOKSHELF_NONE,
  ].includes(bookshelfId);
};

export const useBookshelves = () => {
  const getBookshelf = (bookshelfId) => {
    if (!isValidBookshelf(bookshelfId)) {
      throw new Error(`invalid bookshelf id: ${bookshelfId}`);
    }

    return bookshelves.filter((d) => d.id === bookshelfId)[0];
  };

  const getWantToReadBookshelf = () => getBookshelf(BOOKSHELF_WANT_TO_READ);

  const getCurrentlyReadingBookshelf = () =>
    getBookshelf(BOOKSHELF_CURRENTLY_READING);

  const getAlreadyReadBookshelf = () => getBookshelf(BOOKSHELF_ALREADY_READ);

  return {
    getWantToReadBookshelf,
    getCurrentlyReadingBookshelf,
    getAlreadyReadBookshelf,
    BOOKSHELF_WANT_TO_READ,
    BOOKSHELF_CURRENTLY_READING,
    BOOKSHELF_ALREADY_READ,
    BOOKSHELF_NONE,
    bookshelves,
  };
};
