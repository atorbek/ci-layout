import React from 'react';
import './Footer-Content.css';
import { cn } from '../../../config';

const FooterContent = ({ children, mix }) => {
  return <div className={cn('footer__content')({}, mix)}>{children}</div>;
};

export default FooterContent;
