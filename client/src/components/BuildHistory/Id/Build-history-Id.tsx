import React from 'react';
import './Build-history-Id.css';
import { cn } from '../../../config';

declare interface BuildHistoryIdProps {
  mix?: string[];
}
const BuildHistoryId: React.FC<BuildHistoryIdProps> = ({ mix, children }) => {
  return <div className={cn('build-history__id')({}, mix)}>{children}</div>;
};

export default BuildHistoryId;
