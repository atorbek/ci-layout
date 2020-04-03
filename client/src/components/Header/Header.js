import React from 'react';
import './Header.css';
import './_space/Header_spaceV_l.css';
import './_space/Header_spaceH_m.css';
import HeaderTitle from './Title/Header-Title';
import HeaderContent from './Content/Header-Content';
import HeaderButtons from './Buttons/Header-Buttons';
import { cn } from '../../config';

const Header = ({ title, titleMix, headerMix, children, ...props }) => {
  return (
    <div
      className={cn('header')({ spaceV: 'l', spaceH: 'm' }, headerMix)}
      {...props}
    >
      <HeaderContent>
        <HeaderTitle mix={titleMix}>{title}</HeaderTitle>
        <HeaderButtons>{children}</HeaderButtons>
      </HeaderContent>
    </div>
  );
};

export default Header;
