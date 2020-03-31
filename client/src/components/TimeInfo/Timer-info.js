import React from 'react';
import './Time-info.css';
import { withNaming } from '@bem-react/classname';
import Icon from '../Icon';
import Text from '../Text';
import TimerInfoDateTime from './DateTime/Timer-info-Date-time';
import TimerInfoDurationTime from './DurationTime/Timer-info-Duration-time';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const TimerInfo = ({ start, duration, mix }) => {
  return (
    <div className={cn('timer-info')({}, mix)}>
      <TimerInfoDateTime>
        <Icon type="calendar" />
        <Text size="m" lineHeight="xxxs" view="secondary2">
          {start}
        </Text>
      </TimerInfoDateTime>
      <TimerInfoDurationTime>
        <Icon type="stopwatch" />
        <Text size="m" lineHeight="xxxs" view="secondary2">
          {duration}
        </Text>
      </TimerInfoDurationTime>
    </div>
  );
};

export default TimerInfo;
