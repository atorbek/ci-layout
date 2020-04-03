import React from 'react';
import './Header-Buttons.css';
import { cn } from '../../../config';

const HeaderButtons = ({ mix, children }) => {
  return <div className={cn('header__buttons')({}, mix)}>{children}</div>;
};

export default HeaderButtons;
