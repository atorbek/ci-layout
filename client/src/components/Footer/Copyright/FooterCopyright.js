import React from 'react';
import './Footer-Copyright.css';
import { cn } from '../../../config';

const FooterCopyright = ({ children, mix }) => {
  return <div className={cn('footer__copyright')({}, mix)}>{children}</div>;
};

export default FooterCopyright;
