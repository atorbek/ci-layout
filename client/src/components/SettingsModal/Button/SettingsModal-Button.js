import React from 'react';
import './SettingsModal-Button.css';
import Button from '../../Button';

const SettingsModalButton = ({ children, ...rest }) => {
  return (
    <Button {...rest} mix={['settings-modal__button']}>
      {children}
    </Button>
  );
};

export default SettingsModalButton;
