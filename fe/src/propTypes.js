import PropTypes from "prop-types";

export const BookPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  currentShelf: PropTypes.string,
}).isRequired;
