import React from 'react';
import './Icon.css';
import './_type/Icon_type_alert.css';
import './_type/Icon_type_calendar.css';
import './_type/Icon_type_commit.css';
import './_type/Icon_type_gear.css';
import './_type/Icon_type_play.css';
import './_type/Icon_type_rebuild.css';
import './_type/Icon_type_settings.css';
import './_type/Icon_type_stopwatch.css';
import './_type/Icon_type_user.css';
import './_type/Icon_type_warning.css';
import './_type/Icon_type_success.css';
import './_size/Icon_size_s.css';
import './_size/Icon_size_m.css';
import './_view/Icon_view_brand.css';
import './_indent-r/Icon_indent-r_xxs.css';
import { cn } from '../../config';

const Icon = ({ type, size, view, indentR, mix, children }) => {
  return (
    <div className={cn('icon')({ type, size, view, indentR }, mix)}>
      {children}
    </div>
  );
};

export default Icon;
