import * as api from "../BooksAPI";
import { useState } from "react";

export const useSearch = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
  const [query, setQuery] = useState("");

  const openSearch = () => {
    setShowSearchPage(!showSearchPage);
  };

  const closeSearch = () => {
    setShowSearchPage(!showSearchPage);
    setSearchResults([]);
    setQuery("");
    setShowNoResultsMessage(false);
  };

  const search = async (searchTerm) => {
    const trimmedQuery = searchTerm.trim();

    if (trimmedQuery === query) {
      return;
    }

    const res = await api.search(trimmedQuery);

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
  };
};
