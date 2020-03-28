import React from 'react';
import './Layout-Container.css';
import './_size/Layout-Container_size_m.css';
import './_size/Layout-Container_size_xs.css';
import './_align/Layout-Container_align_center.css';
import './_indent-b/Layout-Container_indent-b_l.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const LayoutContainer = ({ size, align, indentB, mix, children }) => {
  return (
    <div className={cn('layout__container')({ size, indentB, align }, mix)}>
      {children}
    </div>
  );
};

export default LayoutContainer;
