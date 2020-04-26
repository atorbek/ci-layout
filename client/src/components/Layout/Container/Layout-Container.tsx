import React from 'react';
import './Layout-Container.css';
import './_size/Layout-Container_size_m.css';
import './_size/Layout-Container_size_xs.css';
import './_align/Layout-Container_align_center.css';
import './_indent-b/Layout-Container_indent-b_l.css';
import { cn } from '../../../config';

declare interface LayoutContainerProps {
  size?: string;
  align?: string;
  indentB?: string;
  mix?: string[];
}
const LayoutContainer: React.FC<LayoutContainerProps> = ({
  size,
  align,
  indentB,
  mix,
  children
}) => {
  return (
    <div className={cn('layout__container')({ size, indentB, align }, mix)}>
      {children}
    </div>
  );
};

export default LayoutContainer;
