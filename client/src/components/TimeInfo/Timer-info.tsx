import React from 'react';
import './Time-info.css';
import Icon from '../Icon';
import Text from '../Text';
import TimerInfoDateTime from './DateTime/Timer-info-Date-time';
import TimerInfoDurationTime from './DurationTime/Timer-info-Duration-time';
import { addMinutes, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '../../config';

declare interface TimerInfoProps {
  start: string;
  duration?: number;
  mix?: string[];
}
const TimerInfo: React.FC<TimerInfoProps> = ({ start, duration, mix }) => {
  const formatStart = (start: string) =>
    format(new Date(start), 'd MMM HH:mm', {
      locale: ru
    }).replace('.', ',');

  const formatDuration = (duration: number) => {
    const helperDate = addMinutes(new Date(0, 0, 0, 0, 0, 0), duration);
    return format(helperDate, 'H ч mm мин', {
      locale: ru
    });
  };

  return (
    <div className={cn('timer-info')({}, mix)}>
      <TimerInfoDateTime>
        <Icon type="calendar" />
        <Text size="m" lineHeight="xxxs" view="secondary2">
          {formatStart(start)}
        </Text>
      </TimerInfoDateTime>

      <TimerInfoDurationTime>
        <Icon type="stopwatch" />
        <Text size="m" lineHeight="xxxs" view="secondary2">
          {duration && formatDuration(duration)}
        </Text>
      </TimerInfoDurationTime>
    </div>
  );
};

export default TimerInfo;
