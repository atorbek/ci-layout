import React from 'react';
import './Settings-Content.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const SettingsContent = ({ distribute, mix, children }) => {
  return (
    <div className={cn('settings__content')({ distribute }, mix)}>
      {children}
    </div>
  );
};

export default SettingsContent;
