import React from 'react';
import './Header-Title.css';
import { cn } from '../../../config';

const HeaderTitle = ({ mix, children }) => {
  return <div className={cn('header__title')({}, mix)}>{children}</div>;
};

export default HeaderTitle;
