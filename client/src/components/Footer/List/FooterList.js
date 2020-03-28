import React from 'react';
import './Footer-List.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const FooterList = ({ children, mix }) => {
  return <div className={cn('footer__list')({}, mix)}>{children}</div>;
};

export default FooterList;
