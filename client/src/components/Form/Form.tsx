import React from 'react';
import './Form.css';
import { cn } from '../../config';
import { SubmitHandler } from 'redux-form';

declare interface FormProps {
  mix?: string[];
  onSubmit: SubmitHandler;
}
const Form: React.FC<FormProps> = ({ children, mix, onSubmit, ...rest }) => {
  return (
    <form onSubmit={onSubmit} className={cn('form')({}, mix)} {...rest}>
      {children}
    </form>
  );
};

export default Form;
