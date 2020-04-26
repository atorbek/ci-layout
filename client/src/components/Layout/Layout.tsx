import React from 'react';
import '../Layout/Layout.css';
import '../Layout/_vertical_align/Layout_vertical_align_center.css';
import '../Layout/_vertical_align/Layout_vertical_align_top.css';
import '../Layout/_space/Layout_spaceH_m.css';
import { cn } from '../../config';

declare interface LayoutProps {
  verticalAlign?: string;
  spaceH?: string;
  direction?: string;
  mix?: string[];
}
const Layout: React.FC<LayoutProps> = ({
  verticalAlign,
  spaceH,
  direction,
  children,
  mix
}) => {
  return (
    <div className={cn('layout')({ verticalAlign, spaceH, direction }, mix)}>
      {children}
    </div>
  );
};

export default Layout;
