import React from 'react';
import './Form-Input.css';
import '../../FormSettings/Input/Form-Settings__input_number.css';
import { cn } from '../../../config';

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
