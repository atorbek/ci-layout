import React from 'react';
import './Timer-info-Date-time.css';
import { cn } from '../../../config';

declare interface TimerInfoDateTimeProps {
  mix?: string[];
}
const TimerInfoDateTime: React.FC<TimerInfoDateTimeProps> = ({
  mix,
  children
}) => {
  return <div className={cn('time-info__date-time')({}, mix)}>{children}</div>;
};

export default TimerInfoDateTime;
