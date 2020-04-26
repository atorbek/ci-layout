import React from 'react';
import { StaticContext } from 'react-router';
import { withRouter, match } from 'react-router-dom';
import './Build-history.css';
import './_indent-t/Button_indent-t_xs.css';
import './_indent-b/Button_indent-b_xs.css';
import './_indent-b/Button_indent-b_s.css';
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
import { cn } from '../../config';
import * as H from 'history';

declare interface BuildHistoryProps {
  history: H.History;
  location: H.Location;
  match: match;
  staticContext: StaticContext;
  to: string;
  buildNumber: number;
  commitMessage: string;
  branchName: string;
  authorName: string;
  commitHash: string;
  start?: string;
  status: string;
  duration?: number;
  indentT?: string;
  indentB?: string;
  mix?: string[];
}
const BuildHistory: React.FC<BuildHistoryProps> = ({
  history,
  location,
  match,
  staticContext,
  to,
  buildNumber,
  commitMessage,
  branchName,
  authorName,
  commitHash,
  start,
  status,
  duration,
  indentT = 'xs',
  indentB = 'xs',
  mix,
  ...rest
}) => {
  type State = { [key: string]: string };
  const stateBuild: State = {
    Waiting: 'warning',
    Success: 'success',
    Fail: 'alert',
    Canceled: 'alert',
    InProgress: 'warning'
  };

  const handleClick = (): void => {
    to && history.push(to);
  };

  const shortHash = commitHash.slice(0, 6);

  return (
    <div
      onClick={handleClick}
      className={cn('build-history')({ indentT, indentB }, mix)}
      {...rest}
    >
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
          <Commit
            branch={branchName}
            commitHash={shortHash}
            author={authorName}
          />
        </BuildHistoryInfo>
      </BuildHistoryDescription>
      <BuildHistoryData>
        {start && <TimerInfo start={start} duration={duration} />}
      </BuildHistoryData>
    </div>
  );
};

export default withRouter(BuildHistory);
