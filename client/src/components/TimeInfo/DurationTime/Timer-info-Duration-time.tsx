import React from 'react';
import './Timer-info-Duration-time.css';
import { cn } from '../../../config';

declare interface TimerInfoDurationTimeProps {
  mix?: string[];
}
const TimerInfoDurationTime: React.FC<TimerInfoDurationTimeProps> = ({
  mix,
  children
}) => {
  return (
    <div className={cn('time-info__duration-time')({}, mix)}>{children}</div>
  );
};

export default TimerInfoDurationTime;
