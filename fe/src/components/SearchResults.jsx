import PropTypes from "prop-types";
import { Book } from "./Book";

export const SearchResults = ({ results }) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {results.map((result) => (
          <li key={result.id}>
            <Book book={result}></Book>
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
};
