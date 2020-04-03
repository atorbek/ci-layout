import React from 'react';
import './Page.css';
import { cn } from '../../config';

const Page = ({ mix, children }) => {
  return <div className={cn('page')({}, mix)}>{children}</div>;
};

export default Page;
