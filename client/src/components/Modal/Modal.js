import React from 'react';
import './Modal.css';
import { cn } from '../../config';

const Modal = ({ border, space, mix, children, ...rest }) => {
  return (
    <div className={cn('modal')({ border, space }, mix)} {...rest}>
      {children}
    </div>
  );
};

export default Modal;
