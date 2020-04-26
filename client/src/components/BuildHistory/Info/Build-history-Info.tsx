import React from 'react';
import './Build-history-Info.css';
import { cn } from '../../../config';

declare interface BuildHistoryInfoProps {
  mix?: string[];
}
const BuildHistoryInfo: React.FC<BuildHistoryInfoProps> = ({
  mix,
  children
}) => {
  return <div className={cn('build-history__info')({}, mix)}>{children}</div>;
};

export default BuildHistoryInfo;
