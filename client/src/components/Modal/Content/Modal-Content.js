import React from 'react';
import './Modal-Content.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

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
