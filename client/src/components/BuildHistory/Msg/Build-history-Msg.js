import React from 'react';
import './Build-history-Msg.css';
import { cn } from '../../../config';

const BuildHistoryMsg = ({ mix, children }) => {
  return <div className={cn('build-history__msg')({}, mix)}>{children}</div>;
};
export default BuildHistoryMsg;
