import React from 'react';
import './Commit-Author.css';
import { cn } from '../../../config';

const CommitAuthor = ({ mix, children }) => {
  return <div className={cn('commit__author')({}, mix)}>{children}</div>;
};

export default CommitAuthor;
