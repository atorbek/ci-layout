import React from 'react';
import './Build-history-Info.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const BuildHistoryInfo = ({ mix, children }) => {
  return <div className={cn('build-history__info')({}, mix)}>{children}</div>;
};

export default BuildHistoryInfo;
