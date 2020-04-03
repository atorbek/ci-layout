import React from 'react';
import './Button.css';
import './_size/Button_size_l.css';
import './_size/Button_size_xl.css';
import './_size/Button_size_xxxxl.css';
import './_view/Button_view_action.css';
import './_view/Button_view_control.css';
import './_form/Button_form_round.css';
import './_width/Button_width_full.css';
import './_indent-r/Button_indent-r_xs.css';
import { cn } from '../../config';

const Button = ({
  size,
  view,
  width,
  form,
  type = 'button',
  mix,
  indentR,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn('button')({ size, view, width, indentR, form }, mix)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
