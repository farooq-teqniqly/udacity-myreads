import { useState } from "react";
import { BOOKSHELF_NONE } from "../data/bookshelfData";

export const useBookSearch = (useAPI) => {
  if (!useAPI) {
    throw new Error("provide the useAPI hook to this hook");
  }

  const [searchError, setSearchError] = useState(false);
  const [resultCount, setResultCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  const search = async (searchTerm) => {
    if (!searchTerm) {
      throw new Error("searchTerm not provided");
    }

    const result = await useAPI.search(searchTerm);

    if (result.error) {
      setSearchError(true);
      return;
    }

    const books = result.map(({ id, title, authors, imageLinks }) => {
      return {
        id,
        title,
        authors,
        imageUrl: imageLinks.smallThumbnail,
        bookshelfId: BOOKSHELF_NONE,
      };
    });

    setResultCount(books.length);
    setSearchResults(books);
    setSearchError(false);
  };

  return {
    search,
    searchError,
    resultCount,
    searchResults,
  };
};
