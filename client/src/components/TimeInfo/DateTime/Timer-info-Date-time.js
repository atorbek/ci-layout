import React from 'react';
import './Timer-info-Date-time.css';
import { cn } from '../../../config';

const TimerInfoDateTime = ({ mix, children }) => {
  return <div className={cn('time-info__date-time')({}, mix)}>{children}</div>;
};

export default TimerInfoDateTime;
