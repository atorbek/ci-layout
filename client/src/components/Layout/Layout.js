import React from 'react';
import '../Layout/Layout.css';
import '../Layout/_vertical_align/Layout_vertical_align_center.css';
import '../Layout/_vertical_align/Layout_vertical_align_top.css';
import '../Layout/_space/Layout_spaceH_m.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const Layout = ({ verticalAlign, spaceH, direction, children, mix }) => {
  return (
    <div className={cn('layout')({ verticalAlign, spaceH, direction }, mix)}>
      {children}
    </div>
  );
};

export default Layout;
