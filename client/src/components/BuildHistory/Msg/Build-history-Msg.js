import React from 'react';
import './Build-history-Msg.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const BuildHistoryMsg = ({ mix, children }) => {
  return <div className={cn('build-history__msg')({}, mix)}>{children}</div>;
};
export default BuildHistoryMsg;
