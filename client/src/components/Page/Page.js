import React from 'react';
import '../Theme.css';
import './Page.css';

const Page = ({ children }) => {
  return (
    <div className="page theme theme_color_project-default theme_font_ys-text theme_size_default theme_space_default theme_gap_small">
      {children}
    </div>
  );
};

export default Page;
