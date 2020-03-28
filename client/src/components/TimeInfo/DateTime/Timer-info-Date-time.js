import React from 'react';
import './Timer-info-Date-time.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const TimerInfoDateTime = ({ mix, children }) => {
  return <div className={cn('time-info__date-time')({}, mix)}>{children}</div>;
};

export default TimerInfoDateTime;
