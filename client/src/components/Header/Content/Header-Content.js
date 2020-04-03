import React from 'react';
import './Header-Content.css';
import { cn } from '../../../config';

const HeaderContent = ({ mix, children }) => {
  return <div className={cn('header__content')({}, mix)}>{children}</div>;
};

export default HeaderContent;
