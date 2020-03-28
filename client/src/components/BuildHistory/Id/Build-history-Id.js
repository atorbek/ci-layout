import React from 'react';
import './Build-history-Id.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const BuildHistoryId = ({ mix, children }) => {
  return <div className={cn('build-history__id')({}, mix)}>{children}</div>;
};

export default BuildHistoryId;
