import PropTypes from "prop-types";
import { Button } from "./Button";

export const Search = ({ onClose, onSearchTermChanged }) => {
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
          onChange={(e) => onSearchTermChanged(e.target.value)}
        />
      </div>
    </div>
  );
};

Search.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSearchTermChanged: PropTypes.func.isRequired,
};
