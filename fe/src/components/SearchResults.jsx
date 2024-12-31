import PropTypes from "prop-types";
import { Book } from "./Book";

export const SearchResults = ({
  results,
  onBookSelected,
  showNoResultsMessage,
  showApiErrorMessage,
}) => {
  {
    if (showNoResultsMessage) {
      return (
        <div className="search-no-results">
          <span>Your search yielded no results.</span>
        </div>
      );
    }

    if (showApiErrorMessage) {
      return (
        <div className="search-api-error">
          <span>
            There seems to be a problem with search. Try again in a few minutes.
          </span>
        </div>
      );
    }
  }
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {results.map((result) => (
          <li key={result.id}>
            <Book book={result} onSelected={onBookSelected}></Book>
          </li>
        ))}
      </ol>
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string),
      smallThumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBookSelected: PropTypes.func.isRequired,
  showNoResultsMessage: PropTypes.bool.isRequired,
  showApiErrorMessage: PropTypes.bool.isRequired,
};
