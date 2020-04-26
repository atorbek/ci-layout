import React from 'react';
import './Header-Content.css';
import { cn } from '../../../config';

declare interface HeaderContentProps {
  mix?: string[];
}
const HeaderContent: React.FC<HeaderContentProps> = ({ mix, children }) => {
  return <div className={cn('header__content')({}, mix)}>{children}</div>;
};

export default HeaderContent;
