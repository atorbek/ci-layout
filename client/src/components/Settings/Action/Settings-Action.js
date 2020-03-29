import React from 'react';
import './Settings-Action.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const SettingsAction = ({ distribute, mix, children }) => {
  return (
    <div className={cn('settings__action')({ distribute }, mix)}>
      {children}
    </div>
  );
};

export default SettingsAction;
