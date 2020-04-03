import React from 'react';
import './Timer-info-Duration-time.css';
import { cn } from '../../../config';

const TimerInfoDurationTime = ({ mix, children }) => {
  return (
    <div className={cn('time-info__duration-time')({}, mix)}>{children}</div>
  );
};

export default TimerInfoDurationTime;
