export const BOOKSHELF_WANT_TO_READ = "want-to-read";
export const BOOKSHELF_CURRENTLY_READING = "currently-reading";
export const BOOKSHELF_ALREADY_READ = "already-read";
export const BOOKSHELF_NONE = "none";

export const bookshelves = [
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
