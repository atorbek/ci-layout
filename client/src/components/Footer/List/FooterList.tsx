import React from 'react';
import './Footer-List.css';
import { cn } from '../../../config';

declare interface FooterListProps {
  mix?: string[];
}
const FooterList: React.FC<FooterListProps> = ({ children, mix }) => {
  return <div className={cn('footer__list')({}, mix)}>{children}</div>;
};

export default FooterList;
