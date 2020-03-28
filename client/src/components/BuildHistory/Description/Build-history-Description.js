import React from 'react';
import './Build-history-Description.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const BuildHistoryDescription = ({ mix, children }) => {
  return (
    <div className={cn('build-history__description')({}, mix)}>{children}</div>
  );
};

export default BuildHistoryDescription;
