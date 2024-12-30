import PropTypes from "prop-types";
import { Book } from "./Book";

export const SearchResults = ({ results, onBookSelected }) => {
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
};
