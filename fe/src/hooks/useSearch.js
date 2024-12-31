import * as api from "../BooksAPI";
import { useState } from "react";

export const useSearch = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [query, setQuery] = useState("");

  const openSearch = () => {
    setShowSearchPage(!showSearchPage);
  };

  const closeSearch = () => {
    setShowSearchPage(!showSearchPage);
    setSearchResults([]);
    setQuery("");
    setShowNoResultsMessage(false);
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
      setShowNoResultsMessage(false);
    } else {
      setShowNoResultsMessage(true);
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
    showNoResultsMessage,
    apiError,
  };
};
