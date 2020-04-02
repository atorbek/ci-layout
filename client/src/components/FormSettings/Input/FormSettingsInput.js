import React from 'react';
import './FormSettings-Input.css';
import './FormSettings-Input_number.css';
import './_state/FormSettings-input_state_alert.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const FormSettingsInput = ({
  input,
  name,
  placeholder,
  type = 'search',
  state,
  mix,
  rest
}) => (
  <input
    {...input}
    name={name}
    placeholder={placeholder}
    type={type}
    className={cn('form-settings__input')({ state }, mix)}
    {...rest}
  />
);

export default FormSettingsInput;
