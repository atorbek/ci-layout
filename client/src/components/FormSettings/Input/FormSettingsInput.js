import React from 'react';
import './FormSettings-Input.css';
import './FormSettings-Input_number.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const FormSettingsInput = ({ type = 'search', placeholder, mix }) => {
  return (
    <input
      className={cn('form-settings__input')({}, mix)}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default FormSettingsInput;
