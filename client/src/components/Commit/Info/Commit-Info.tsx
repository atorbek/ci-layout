import React from 'react';
import './Commit-Info.css';
import { cn } from '../../../config';

declare interface CommitInfoProps {
  mix?: string[];
}

const CommitInfo: React.FC<CommitInfoProps> = ({ mix, children }) => {
  return <div className={cn('commit__info')({}, mix)}>{children}</div>;
};

export default CommitInfo;
