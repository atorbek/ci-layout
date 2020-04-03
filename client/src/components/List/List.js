import React from 'react';
import connect from 'react-redux/es/connect/connect';
import '../List/List.css';
import { cn } from '../../config';

const List = ({ indentT, children, mix }) => {
  return <div className={cn('list')({ indentT }, mix)}>{children}</div>;
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(List);
