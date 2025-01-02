import PropTypes from "prop-types";

export const Button = ({ text, onButtonClicked }) => {
  return <a onClick={onButtonClicked}>{text}</a>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onButtonClicked: PropTypes.func.isRequired,
};
