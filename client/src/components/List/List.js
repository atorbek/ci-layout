import React from 'react';
import connect from 'react-redux/es/connect/connect';
import '../List/List.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const List = ({ indentT, children, mix }) => {
  return <div className={cn('list')({ indentT }, mix)}>{children}</div>;
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(List);
