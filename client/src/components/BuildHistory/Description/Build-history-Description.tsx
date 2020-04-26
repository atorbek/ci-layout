import React from 'react';
import './Build-history-Description.css';
import { cn } from '../../../config';

declare interface BuildHistoryDescriptionProps {
  mix?: string[];
}
const BuildHistoryDescription: React.FC<BuildHistoryDescriptionProps> = ({
  mix,
  children
}) => {
  return (
    <div className={cn('build-history__description')({}, mix)}>{children}</div>
  );
};

export default BuildHistoryDescription;
