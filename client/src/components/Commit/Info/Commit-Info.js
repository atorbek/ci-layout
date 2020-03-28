import React from 'react';
import './Commit-Info.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const CommitInfo = ({ mix, children }) => {
  return <div className={cn('commit__info')({}, mix)}>{children}</div>;
};

export default CommitInfo;
