import React from 'react';
import './Header-Content.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const HeaderContent = ({ mix, children }) => {
  return <div className={cn('header__content')({}, mix)}>{children}</div>;
};

export default HeaderContent;
