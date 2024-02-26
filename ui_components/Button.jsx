import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, className, children }) => {
  return (
    <button
      type="button"
      className={`btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
  className: '',
};

export default Button;