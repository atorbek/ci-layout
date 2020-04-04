import React from 'react';
import './Loader.css';
import { cn } from '../../config';

const Loader = ({ mix, ...rest }) => {
  return <div className={cn('loader')({}, mix)} {...rest} />;
};

export default Loader;
