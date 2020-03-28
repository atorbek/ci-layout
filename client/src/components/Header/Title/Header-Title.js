import React from 'react';
import './Header-Title.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const HeaderTitle = ({ mix, children }) => {
  return <div className={cn('header__title')({}, mix)}>{children}</div>;
};

export default HeaderTitle;
