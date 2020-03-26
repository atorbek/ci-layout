import React from 'react';
import './Header.css';
import connect from 'react-redux/es/connect/connect';

const Header = ({ tag, mod, children }) => {
  return (
    <div className="header decorator header_space-v_l decorator_space-h_m">
      {children}

      {/*<div className="header__content">*/}
      {/*  <h1 className="header__title text text_size_xxxl text_view_primary text_line-height_xl">*/}
      {/*    philip1967/my-awesome-repo*/}
      {/*  </h1>*/}
      {/*  <div className="header__buttons">*/}
      {/*    <button className="button button_size_xl button_view_control button_form_round decorator_indent-r_xs">*/}
      {/*      <div className="icon button__icon icon_type_play icon_size_s icon_view_brand"></div>*/}
      {/*      <span className="button__text">Run build</span>*/}
      {/*    </button>*/}
      {/*    <button className="button button_size_l button_view_control button_form_round">*/}
      {/*      <div className="icon button__icon icon_type_gear icon_size_s icon_view_brand"></div>*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
