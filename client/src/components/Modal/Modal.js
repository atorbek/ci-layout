import React from 'react';
import './Modal.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const Modal = ({ border, space, mix, children, ...rest }) => {
  return (
    <div className={cn('modal')({ border, space }, mix)} {...rest}>
      {children}
    </div>
  );
};

export default Modal;
