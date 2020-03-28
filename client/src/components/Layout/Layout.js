import React from 'react';
import connect from 'react-redux/es/connect/connect';
import '../Layout/Layout.css';
import '../Layout/_vertical_align/Layout_vertical_align_center.css';
import '../Layout/_vertical_align/Layout_vertical_align_top.css';
import '../Layout/_space/Layout_spaceH_m.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const Layout = ({ verticalAlign, spaceH, children, mix }) => {
  return (
    <div className={cn('layout')({ verticalAlign, spaceH }, mix)}>
      {children}
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
