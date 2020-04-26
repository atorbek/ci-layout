import React from 'react';
import './Modal-Content.css';
import { cn } from '../../../config';

declare interface ModalContentProps {
  space?: string;
  border?: string;
  mix?: string[];
}
const ModalContent: React.FC<ModalContentProps> = ({
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
