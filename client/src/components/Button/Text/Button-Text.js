import React from 'react';
import './Button-Text.css';
import { cn } from '../../../config';

const ButtonText = ({ mix, children }) => {
  return <div className={cn('button__text')({}, mix)}>{children}</div>;
};

export default ButtonText;
