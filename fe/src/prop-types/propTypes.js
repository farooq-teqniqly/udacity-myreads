import PropTypes from "prop-types";

export const BookPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageUrl: PropTypes.string,
  bookshelfId: PropTypes.string.isRequired,
});

export const BookshelfPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});
