import React from 'react';
import './Text.css';
import './_align/Text_align_center.css';
import './_type/Text_type_h2.css';
import './_type/Text_type_p.css';
import './_type/Text_type_span.css';
import './_size/Text_size_xxs.css';
import './_size/Text_size_xs.css';
import './_size/Text_size_s.css';
import './_size/Text_size_m.css';
import './_size/Text_size_l.css';
import './_size/Text_size_xl.css';
import './_size/Text_size_xxl.css';
import './_size/Text_size_xxxl.css';
import './_line-height/Text_line-height_xxxxs.css';
import './_line-height/Text_line-height_xxxs.css';
import './_line-height/Text_line-height_xxs.css';
import './_line-height/Text_line-height_xs.css';
import './_line-height/Text_line-height_s.css';
import './_line-height/Text_line-height_m.css';
import './_line-height/Text_line-height_l.css';
import './_line-height/Text_line-height_xl.css';
import './_line-height/Text_line-height_xxl.css';
import './_line-height/Text_line-height_xxxl.css';
import './_line-height/Text_line-height_xxxxl.css';
import './_line-height/Text_line-height_xxxxxl.css';
import './_view/Text_view_primary.css';
import './_view/Text_view_alert.css';
import './_view/Text_view_ghost.css';
import './_view/Text_view_link.css';
import './_view/Text_view_secodary.css';
import './_view/Text_view_secodary2.css';
import './_view/Text_view_success.css';
import './_view/Text_view_warning.css';
import './_indent-r/Text_indent-r_xxs.css';
import { cn } from '../../config';

const Text = ({
  tag = 'div',
  align,
  lineHeight,
  size,
  type,
  view,
  indentR,
  mix,
  children,
  ...rest
}) => {
  return React.createElement(
    tag,
    {
      className: cn('text')(
        { align, lineHeight, size, type, view, indentR },
        mix
      ),
      ...rest
    },
    children
  );
};

export default Text;
