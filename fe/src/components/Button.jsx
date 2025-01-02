import PropTypes from "prop-types";

export const Button = ({ text, className, onButtonClicked }) => {
  return (
    <a className={className} onClick={onButtonClicked}>
      {text}
    </a>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onButtonClicked: PropTypes.func.isRequired,
};
