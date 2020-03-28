import React from 'react';
import './Header.css';
import './_space/Header_spaceV_l.css';
import './_space/Header_spaceH_m.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const Header = ({ spaceV, spaceH, children, mix }) => {
  return (
    <div className={cn('header')({ spaceV, spaceH }, mix)}>{children}</div>
  );
};

export default Header;
