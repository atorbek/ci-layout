import React from 'react';
import './Form.css';
import { cn } from '../../config';

const Form = ({ children, mix, ...rest }) => {
  return (
    <form className={cn('form')({}, mix)} {...rest}>
      {children}
    </form>
  );
};

export default Form;
