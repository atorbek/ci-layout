import React from 'react';
import './Footer-Copyright.css';
import { cn } from '../../../config';

declare interface FooterCopyrightProps {
  mix?: string[];
}
const FooterCopyright: React.FC<FooterCopyrightProps> = ({ children, mix }) => {
  return <div className={cn('footer__copyright')({}, mix)}>{children}</div>;
};

export default FooterCopyright;
