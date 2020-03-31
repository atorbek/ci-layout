import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './Build-history.css';
import './_indent-t/Button_indent-t_xs.css';
import './_indent-b/Button_indent-b_xs.css';
import './_indent-b/Button_indent-b_s.css';
import { withNaming } from '@bem-react/classname';
import '../Text/Text.css';
import '../Text/_size/Text_size_l.css';
import '../Text/_line-height/Text_line-height_xs.css';
import BuildHistoryDescription from './Description/Build-history-Description';
import BuildHistoryStatus from './Status/Build-history-Status';
import Icon from '../Icon';
import BuildHistoryInfo from './Info/Build-history-Info';
import BuildHistoryTitle from './Title/Build-history-Title';
import BuildHistoryId from './Id/Build-history-Id';
import BuildHistoryMsg from './Msg/Build-history-Msg';
import Commit from '../Commit';
import BuildHistoryData from './Data/Build-history-Data';
import TimerInfo from '../TimeInfo';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const BuildHistory = ({
  buildNumber,
  commitMessage,
  branchName,
  authorName,
  hash,
  start,
  status,
  duration,
  indentT,
  indentB,
  mix
}) => {
  const stateBuild = {
    Waiting: 'warning',
    Success: 'success',
    Fail: 'alert',
    Canceled: 'alert',
    InProgress: 'warning'
  };

  const shortHash = hash.slice(0, 6);
  const formatStart = (start) =>
    format(new Date(start), 'd MMM HH:mm', {
      locale: ru
    }).replace('.', ',');

  return (
    <div className={cn('build-history')({ indentT, indentB }, mix)}>
      <BuildHistoryDescription>
        <BuildHistoryStatus>
          <Icon type={stateBuild[status]} size="m" view="brand" />
        </BuildHistoryStatus>
        <BuildHistoryInfo>
          <BuildHistoryTitle>
            <BuildHistoryId
              mix={[
                'text',
                'text_size_xs',
                `text_view_${stateBuild[status]}`,
                'text_lineHeight_xs',
                'text_size_xxl'
              ]}
            >
              {buildNumber}
            </BuildHistoryId>
            <BuildHistoryMsg
              mix={['text', 'text_size_l', 'text_lineHeight_xs']}
            >
              {commitMessage}
            </BuildHistoryMsg>
          </BuildHistoryTitle>
          <Commit branch={branchName} hash={shortHash} author={authorName} />
        </BuildHistoryInfo>
      </BuildHistoryDescription>
      {start && (
        <BuildHistoryData>
          <TimerInfo start={formatStart(start)} duration={duration} />
        </BuildHistoryData>
      )}
    </div>
  );
};

export default BuildHistory;
