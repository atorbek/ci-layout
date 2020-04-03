import React from 'react';
import './Commit-Info.css';
import { cn } from '../../../config';

const CommitInfo = ({ mix, children }) => {
  return <div className={cn('commit__info')({}, mix)}>{children}</div>;
};

export default CommitInfo;
