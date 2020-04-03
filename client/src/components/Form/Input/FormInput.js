import React from 'react';
import './Form-Input.css';
import '../../FormSettings/Input/Form-Settings__input_number.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const FormInput = ({
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
    className={cn('form__input')({ state }, mix)}
    {...rest}
  />
);

export default FormInput;
