import React from 'react';
import './Time-info.css';
import Icon from '../Icon';
import Text from '../Text';
import TimerInfoDateTime from './DateTime/Timer-info-Date-time';
import TimerInfoDurationTime from './DurationTime/Timer-info-Duration-time';
import { format } from 'date-fns';
import { ru, enGB } from 'date-fns/locale';
import { cn } from '../../config';
import { useTranslation } from 'react-i18next';

declare interface TimerInfoProps {
  start: string;
  duration?: number;
  mix?: string[];
}
const TimerInfo: React.FC<TimerInfoProps> = ({ start, duration, mix }) => {
  const { i18n } = useTranslation();

  const formatStart = (start: string, lang: string): string =>
    format(new Date(start), 'd MMM HH:mm', {
      locale: lang === 'ru' ? ru : enGB
    }).replace('.', ',');

  const formatDuration = (duration: number, lang: string): string => {
    const hours: number = Math.floor(duration / 60);
    const minutes: number = duration % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return lang === 'ru'
      ? `${hours} ч ${formattedMinutes} мин`
      : `${hours} h ${formattedMinutes} min`;
  };

  return (
    <div className={cn('timer-info')({}, mix)}>
      <TimerInfoDateTime>
        <Icon type="calendar" />
        <Text size="m" lineHeight="xxxs" view="secondary2">
          {formatStart(start, i18n.language)}
        </Text>
      </TimerInfoDateTime>

      <TimerInfoDurationTime>
        <Icon type="stopwatch" />
        <Text size="m" lineHeight="xxxs" view="secondary2">
          {duration && formatDuration(duration, i18n.language)}
        </Text>
      </TimerInfoDurationTime>
    </div>
  );
};

export default TimerInfo;
