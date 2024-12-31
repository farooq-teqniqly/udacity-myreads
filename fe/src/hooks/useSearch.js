import * as api from "../BooksAPI";
import { useState } from "react";

export const useSearch = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  const openSearch = () => {
    setShowSearchPage(!showSearchPage);
  };

  const closeSearch = () => {
    setShowSearchPage(!showSearchPage);
    setSearchResults([]);
    setQuery("");
  };

  const search = async (searchTerm) => {
    const trimmedQuery = searchTerm.trim();

    if (trimmedQuery === query) {
      return;
    }

    const res = await api.search(trimmedQuery);

    const books = res.map(({ id, title, authors, imageLinks }) => {
      return {
        id,
        title,
        authors,
        smallThumbnail: imageLinks.smallThumbnail,
      };
    });

    setSearchResults(books);
    setQuery(trimmedQuery);
  };

  return {
    showSearchPage,
    searchResults,
    search,
    closeSearch,
    openSearch,
  };
};
