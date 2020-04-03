import React from 'react';
import './SettingsModal-Button.css';
import Button from '../../Button';

const RunBuildModalButton = ({ children, ...rest }) => {
  return (
    <Button {...rest} mix={['run-build-modal__button']}>
      {children}
    </Button>
  );
};

export default RunBuildModalButton;
