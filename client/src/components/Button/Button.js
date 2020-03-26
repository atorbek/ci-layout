import React from 'react';
import './Button.css';

const Button = ({ children }) => {
  return (
    <button className="button button_size_xl button_view_control button_form_round decorator_indent-r_xs">
      {children}
    </button>
  );
};

export default Button;
