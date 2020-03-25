import React from 'react';
import './Button.css';

const Button = (props) => {
  return (
    <button className="button button_size_xl button_view_control button_form_round decorator_indent-r_xs">
      <div className="icon button__icon icon_type_play icon_size_s icon_view_brand"></div>
      <span className="button__text">Run build</span>
    </button>
  );
};

export default Button;
