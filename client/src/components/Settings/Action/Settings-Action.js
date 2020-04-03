import React from 'react';
import './Settings-Action.css';
import { cn } from '../../../config';

const SettingsAction = ({ distribute, mix, children }) => {
  return (
    <div className={cn('settings__action')({ distribute }, mix)}>
      {children}
    </div>
  );
};

export default SettingsAction;
