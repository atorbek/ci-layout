import React from 'react';
import './Footer-Content.css';
import { cn } from '../../../config';

declare interface FooterContentProps {
  mix?: string[];
}
const FooterContent: React.FC<FooterContentProps> = ({ children, mix }) => {
  return <div className={cn('footer__content')({}, mix)}>{children}</div>;
};

export default FooterContent;
