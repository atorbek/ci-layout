import React from 'react';
import './Form-Item.css';
import './_direction/Form__item_direction_column.css';
import './_direction/Form__item_direction_row.css';
import './_distribute/Form__item_distribute_between.css';
import './_indentB/Form-item_indent-b_xl.css';
import './_indentB/Form-item_indent-b_xxxxl.css';
import './_indentB/Form-item_indent-b_xxxxxl.css';
import './_indentT/Form-item_indent-t_xs.css';
import './_vertical/Form-item_vertical-align_center.css';
import { cn } from '../../../config';

const FormItem = ({
  indentT,
  indentB,
  verticalAlign,
  direction,
  children,
  mix
}) => {
  return (
    <div
      className={cn('form__item')(
        { indentT, indentB, verticalAlign, direction },
        mix
      )}
    >
      {children}
    </div>
  );
};

export default FormItem;
