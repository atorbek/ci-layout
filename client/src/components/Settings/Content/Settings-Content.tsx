import React from 'react';
import './Settings-Content.css';
import { cn } from '../../../config';

declare interface SettingsContentProps {
  distribute?: string;
  mix?: string[];
}
const SettingsContent: React.FC<SettingsContentProps> = ({
  distribute,
  mix,
  children
}) => {
  return (
    <div className={cn('settings__content')({ distribute }, mix)}>
      {children}
    </div>
  );
};

export default SettingsContent;
