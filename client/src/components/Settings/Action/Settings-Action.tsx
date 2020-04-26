import React from 'react';
import './Settings-Action.css';
import { cn } from '../../../config';

declare interface SettingsActionProps {
  distribute?: string;
  mix?: string[];
}
const SettingsAction: React.FC<SettingsActionProps> = ({
  distribute,
  mix,
  children
}) => {
  return (
    <div className={cn('settings__action')({ distribute }, mix)}>
      {children}
    </div>
  );
};

export default SettingsAction;
