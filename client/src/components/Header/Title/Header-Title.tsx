import React from 'react';
import './Header-Title.css';
import { cn } from '../../../config';

declare interface HeaderContentProps {
  mix?: string[];
}
const HeaderTitle: React.FC<HeaderContentProps> = ({ mix, children }) => {
  return <div className={cn('header__title')({}, mix)}>{children}</div>;
};

export default HeaderTitle;
