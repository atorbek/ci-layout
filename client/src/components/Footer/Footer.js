import React from 'react';
import './Footer.css';
import './_space/Footer_spaceH_m.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const Footer = ({ spaceH, children, mix }) => {
  return <div className={cn('footer')({ spaceH }, mix)}>{children}</div>;
};

export default Footer;
