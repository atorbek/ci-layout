import React, { InputHTMLAttributes } from 'react';
import './Form-Input.css';
import './_state/Form-input_state_alert.css';
import '../../FormSettings/Input/Form-Settings__input_number.css';
import { cn } from '../../../config';
import { WrappedFieldProps } from 'redux-form';

declare interface FormInputProps {
  placeholder?: string;
  state?: string;
  mix?: string[];
}
export type ReduxFormProps = InputHTMLAttributes<HTMLInputElement> &
  WrappedFieldProps;
const FormInput: React.FC<FormInputProps & ReduxFormProps> = ({
  input,
  placeholder,
  type = 'search',
  state,
  mix,
  ...rest
}) => (
  <input
    {...input}
    placeholder={placeholder}
    type={type}
    className={cn('form__input')({ state }, mix)}
    {...rest}
  />
);
export default FormInput;
