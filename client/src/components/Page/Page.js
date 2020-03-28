import React from 'react';
import './Page.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const Page = ({ mix, children }) => {
  return <div className={cn('page')({}, mix)}>{children}</div>;
};

export default Page;
