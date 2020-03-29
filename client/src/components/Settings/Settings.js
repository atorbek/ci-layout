import React from 'react';
import './Settings.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const Settings = ({ mix, children }) => {
  return <div className={cn('settings')({}, mix)}>{children}</div>;
};

export default Settings;
