import React from 'react';
import connect from 'react-redux/es/connect/connect';
import '../Item/List-Item.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const ListItem = ({ children, mix }) => {
  return <a className={cn('list__item')({}, mix)}>{children}</a>;
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
