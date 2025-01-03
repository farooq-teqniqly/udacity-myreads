import PropTypes from "prop-types";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useBookSearch } from "../hooks/useBookSearch";
import { useAPI } from "../hooks/useAPI";

export const Search = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { debouncedValue: debouncedSearchTerm } = useDebounce(searchTerm, 1000);
  const { search } = useBookSearch(useAPI());

  useEffect(() => {
    const doSearch = async () => {
      if (debouncedSearchTerm) {
        await search(debouncedSearchTerm);
      }
    };

    doSearch();
  }, [debouncedSearchTerm, search]);

  return (
    <div className="search-books-bar">
      <Button
        text="Close"
        className={"close-search"}
        onButtonClicked={onClose}
      />

      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

Search.propTypes = {
  onClose: PropTypes.func.isRequired,
};
