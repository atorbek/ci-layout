import React from 'react';
import './Build-history-Data.css';
import { cn } from '../../../config';

const BuildHistoryData = ({ mix, children }) => {
  return <div className={cn('build-history__data')({}, mix)}>{children}</div>;
};

export default BuildHistoryData;
