import React from 'react';
import './Header-Buttons.css';
import { cn } from '../../../config';

declare interface HeaderButtonsProps {
  mix?: string[];
}
const HeaderButtons: React.FC<HeaderButtonsProps> = ({ mix, children }) => {
  return <div className={cn('header__buttons')({}, mix)}>{children}</div>;
};

export default HeaderButtons;
