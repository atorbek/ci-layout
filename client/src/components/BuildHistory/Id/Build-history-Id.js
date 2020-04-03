import React from 'react';
import './Build-history-Id.css';
import { cn } from '../../../config';

const BuildHistoryId = ({ mix, children }) => {
  return <div className={cn('build-history__id')({}, mix)}>{children}</div>;
};

export default BuildHistoryId;
