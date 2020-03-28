import React from 'react';
import './Footer-Copyright.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const FooterCopyright = ({ children, mix }) => {
  return <div className={cn('footer__copyright')({}, mix)}>{children}</div>;
};

export default FooterCopyright;
