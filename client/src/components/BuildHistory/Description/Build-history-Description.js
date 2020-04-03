import React from 'react';
import './Build-history-Description.css';
import { cn } from '../../../config';

const BuildHistoryDescription = ({ mix, children }) => {
  return (
    <div className={cn('build-history__description')({}, mix)}>{children}</div>
  );
};

export default BuildHistoryDescription;
