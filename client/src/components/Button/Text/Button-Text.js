import React from 'react';
import './Button-Text.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const ButtonText = ({ mix, children }) => {
  return <div className={cn('button__text')({}, mix)}>{children}</div>;
};

export default ButtonText;
