import React from 'react';
import './Build-history-Title.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const BuildHistoryTitle = ({ mix, children }) => {
  return <div className={cn('build-history__title')({}, mix)}>{children}</div>;
};

export default BuildHistoryTitle;
