import { useState, useCallback } from "react";
import { useBookshelves } from "./useBookshelves";

export const useBookSearch = (useAPI) => {
  if (!useAPI) {
    throw new Error("provide the useAPI hook to this hook");
  }

  const [searchError, setSearchError] = useState(false);
  const [resultCount, setResultCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const { BOOKSHELF_NONE } = useBookshelves();

  const search = useCallback(
    async (searchTerm) => {
      if (!searchTerm) {
        throw new Error("searchTerm not provided");
      }

      const result = await useAPI.search(searchTerm);

      if (result.error) {
        setSearchError(true);
        return;
      }

      const books = result.books.map(({ id, title, authors, imageLinks }) => {
        return {
          id,
          title,
          authors,
          imageUrl: imageLinks?.smallThumbnail,
          bookshelfId: BOOKSHELF_NONE,
        };
      });

      setResultCount(books.length);
      setSearchResults(books);
      setSearchError(false);
    },
    [useAPI, BOOKSHELF_NONE]
  );

  return {
    search,
    searchError,
    resultCount,
    searchResults,
  };
};
