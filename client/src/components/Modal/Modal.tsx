import React from 'react';
import './Modal.css';
import { cn } from '../../config';

declare interface ModalProps {
  border?: string;
  space?: string;
  mix?: string[];
}
const Modal: React.FC<ModalProps> = ({
  border,
  space,
  mix,
  children,
  ...rest
}) => {
  return (
    <div className={cn('modal')({ border, space }, mix)} {...rest}>
      {children}
    </div>
  );
};

export default Modal;
