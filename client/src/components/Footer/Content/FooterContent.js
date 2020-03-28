import React from 'react';
import './Footer-Content.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const FooterContent = ({ children, mix }) => {
  return <div className={cn('footer__content')({}, mix)}>{children}</div>;
};

export default FooterContent;
