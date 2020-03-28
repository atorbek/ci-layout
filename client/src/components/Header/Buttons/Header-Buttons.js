import React from 'react';
import './Header-Buttons.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const HeaderButtons = ({ mix, children }) => {
  return <div className={cn('header__buttons')({}, mix)}>{children}</div>;
};

export default HeaderButtons;
