import React from 'react';
import './Form.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const Form = ({ children, mix, ...rest }) => {
  return (
    <form className={cn('form')({}, mix)} {...rest}>
      {children}
    </form>
  );
};

export default Form;
