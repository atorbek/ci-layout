import React from 'react';
import './Build-history-Title.css';
import { cn } from '../../../config';

const BuildHistoryTitle = ({ mix, children }) => {
  return <div className={cn('build-history__title')({}, mix)}>{children}</div>;
};

export default BuildHistoryTitle;
