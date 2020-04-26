import React from 'react';
import './Build-history-Data.css';
import { cn } from '../../../config';

declare interface BuildHistoryDataProps {
  mix?: string[];
}
const BuildHistoryData: React.FC<BuildHistoryDataProps> = ({
  mix,
  children
}) => {
  return <div className={cn('build-history__data')({}, mix)}>{children}</div>;
};

export default BuildHistoryData;
