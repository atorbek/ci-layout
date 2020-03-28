import React from 'react';
import './Build-history-Status.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const BuildHistoryStatus = ({ mix, children }) => {
  return <div className={cn('build-history__status')({}, mix)}>{children}</div>;
};

export default BuildHistoryStatus;
