import React from 'react';
import './Button-Text.css';
import { cn } from '../../../config';

interface ButtonProps {
  mix?: string[];
}
const ButtonText: React.FC<ButtonProps> = ({ mix, children }) => {
  return <div className={cn('button__text')({}, mix)}>{children}</div>;
};

export default ButtonText;
