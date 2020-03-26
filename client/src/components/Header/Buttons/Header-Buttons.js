import React from 'react';
import './Header-Buttons.css';

const HeaderButtons = ({ mod, children }) => {
  return <div className="header__buttons">{children}</div>;
};

export default HeaderButtons;
