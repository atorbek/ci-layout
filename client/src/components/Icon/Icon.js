import React from 'react';
import './Icon.css';
import connect from 'react-redux/es/connect/connect';
import Button from '../Button';

const Icon = ({ mod, elem, children }) => {
  return (
    <div className="icon button__icon icon_type_play icon_size_s icon_view_brand">
      {children}
    </div>
  );
};

export default Icon;
