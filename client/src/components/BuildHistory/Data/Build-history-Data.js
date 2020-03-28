import React from 'react';
import './Build-history-Data.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const BuildHistoryData = ({ mix, children }) => {
  return <div className={cn('build-history__data')({}, mix)}>{children}</div>;
};

export default BuildHistoryData;
