import React from 'react';
import './Settings.css';
import { cn } from '../../config';

const Settings = ({ mix, children }) => {
  return <div className={cn('settings')({}, mix)}>{children}</div>;
};

export default Settings;
