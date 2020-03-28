import React from 'react';
import './Commit-Author.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const CommitAuthor = ({ mix, children }) => {
  return <div className={cn('commit__author')({}, mix)}>{children}</div>;
};

export default CommitAuthor;
