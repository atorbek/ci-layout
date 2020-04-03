import React from 'react';
import './Modal-Content.css';
import { cn } from '../../../config';

const ModalContent = ({
  space = 'l',
  border = 'all',
  mix,
  children,
  ...rest
}) => {
  return (
    <div className={cn('modal__content')({ space, border }, mix)} {...rest}>
      {children}
    </div>
  );
};

export default ModalContent;
