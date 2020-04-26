import React from 'react';
import './Settings.css';
import { cn } from '../../config';

declare interface SettingsProps {
  mix?: string[];
}
const Settings: React.FC<SettingsProps> = ({ mix, children }) => {
  return <div className={cn('settings')({}, mix)}>{children}</div>;
};

export default Settings;
