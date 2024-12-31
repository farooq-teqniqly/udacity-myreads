import * as api from "../BooksAPI";
import { useState } from "react";

export const useSearch = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [query, setQuery] = useState("");

  const openSearch = () => {
    setShowSearchPage(true);
  };

  const closeSearch = () => {
    setShowSearchPage(false);
    setSearchResults([]);
    setQuery("");
    setNoResults(false);
    setApiError(false);
  };

  const search = async (searchTerm) => {
    const trimmedQuery = searchTerm.trim();

    if (trimmedQuery === query) {
      return;
    }

    let res;

    try {
      res = await api.search(trimmedQuery);
      setApiError(false);
      // eslint-disable-next-line no-unused-vars
    } catch (_ignored) {
      setApiError(true);
      return;
    }

    let books = [];

    if (!res.error) {
      books = res.map(({ id, title, authors, imageLinks }) => {
        return {
          id,
          title,
          authors,
          smallThumbnail: imageLinks.smallThumbnail,
        };
      });
      setNoResults(false);
    } else {
      setNoResults(true);
    }

    setSearchResults(books);
    setQuery(trimmedQuery);
  };

  return {
    showSearchPage,
    searchResults,
    search,
    closeSearch,
    openSearch,
    noResults,
    apiError,
  };
};
