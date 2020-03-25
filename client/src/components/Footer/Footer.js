import React from 'react';
import './Footer.css';

const Footer = (props) => {
  return (
    <div className="footer decorator decorator_space-h_m">
      <div className="footer__content">
        <div className="list decorator decorator_indent-t_xs">
          <a
            href=""
            className="list__item link link_theme_normal text text_line-height_xxxs text_size_m decorator decorator_indent-r_xs "
          >
            Support
          </a>
          <a
            href=""
            className="list__item link link_theme_normal text text_line-height_xxxs text_size_m"
          >
            Learning
          </a>
        </div>
        <div className="footer__content_copyright text text_line-height_xxs text_size_m text_view_secondary">
          © 2020 Your Name
        </div>
      </div>
    </div>
  );
};

export default Footer;
