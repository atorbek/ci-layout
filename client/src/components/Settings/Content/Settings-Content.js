import React from 'react';
import './Settings-Content.css';
import { cn } from '../../../config';

const SettingsContent = ({ distribute, mix, children }) => {
  return (
    <div className={cn('settings__content')({ distribute }, mix)}>
      {children}
    </div>
  );
};

export default SettingsContent;
