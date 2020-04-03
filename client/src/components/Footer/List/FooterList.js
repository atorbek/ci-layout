import React from 'react';
import './Footer-List.css';
import { cn } from '../../../config';

const FooterList = ({ children, mix }) => {
  return <div className={cn('footer__list')({}, mix)}>{children}</div>;
};

export default FooterList;
