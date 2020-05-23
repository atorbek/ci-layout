import React from 'react';
import connect from 'react-redux/es/connect/connect';
import '../Item/List-Item.css';
import { cn } from '../../../config';

const ListItem = ({ children, mix, ...rest }) => {
  return (
    <span className={cn('list__item')({}, mix)} {...rest}>
      {children}
    </span>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
