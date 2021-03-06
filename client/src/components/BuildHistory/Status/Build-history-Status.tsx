import React from 'react';
import './Build-history-Status.css';
import { cn } from '../../../config';

declare interface BuildHistoryStatusProps {
  mix?: string[];
}
const BuildHistoryStatus: React.FC<BuildHistoryStatusProps> = ({
  mix,
  children
}) => {
  return <div className={cn('build-history__status')({}, mix)}>{children}</div>;
};

export default BuildHistoryStatus;
