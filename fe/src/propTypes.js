import PropTypes from "prop-types";

export const BookPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  currentShelf: PropTypes.string,
}).isRequired;

export const ShelfPropType = PropTypes.shape({
  wantToRead: PropTypes.arrayOf(BookPropType),
  currentlyReading: PropTypes.arrayOf(BookPropType),
  alreadyRead: PropTypes.arrayOf(BookPropType),
}).isRequired;
