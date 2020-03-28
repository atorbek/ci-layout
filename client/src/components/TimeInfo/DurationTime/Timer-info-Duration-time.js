import React from 'react';
import './Timer-info-Duration-time.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const TimerInfoDurationTime = ({ mix, children }) => {
  return (
    <div className={cn('time-info__duration-time')({}, mix)}>{children}</div>
  );
};

export default TimerInfoDurationTime;
