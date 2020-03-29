import React from 'react';
import './FormSettings-Input.css';
import './FormSettings-Input_number.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const FormSettingsInput = ({
  input,
  name,
  placeholder,
  type = 'search',
  mix
}) => (
  <input
    {...input}
    name={name}
    placeholder={placeholder}
    type={type}
    className={cn('form-settings__input')({}, mix)}
  />
);

export default FormSettingsInput;
