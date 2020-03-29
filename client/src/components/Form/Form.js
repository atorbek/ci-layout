import React from 'react';
import './Form.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const Form = ({ children, mix }) => {
  return <div className={cn('form')({}, mix)}>{children}</div>;
};

export default Form;
