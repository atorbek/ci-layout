import React from 'react';
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

const BuildHistory = ({ id, msg, indentT, indentB, mix }) => {
  return (
    <div className={cn('build-history')({ indentT, indentB }, mix)}>
      <BuildHistoryDescription>
        <BuildHistoryStatus>
          <Icon type="success" size="m" view="brand" />
        </BuildHistoryStatus>
        <BuildHistoryInfo>
          <BuildHistoryTitle>
            <BuildHistoryId
              mix={[
                'text',
                'text_size_xs',
                'text_view_success',
                'text_lineHeight_xs',
                'text_size_xxl'
              ]}
            >
              {id}
            </BuildHistoryId>
            <BuildHistoryMsg
              mix={['text', 'text_size_l', 'text_lineHeight_xs']}
            >
              {msg}
            </BuildHistoryMsg>
          </BuildHistoryTitle>
          <Commit branch="master" hash="9c9f0b9" author="Philip Kirkorov" />
        </BuildHistoryInfo>
      </BuildHistoryDescription>
      <BuildHistoryData>
        <TimerInfo />
      </BuildHistoryData>
    </div>
  );
};

export default BuildHistory;
