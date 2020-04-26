import React from 'react';
import './Loader.css';
import { cn } from '../../config';

declare interface LoaderProps {
  mix?: string[];
}

const Loader: React.FC<LoaderProps> = ({ mix, ...rest }) => {
  return <div className={cn('loader')({}, mix)} {...rest} />;
};

export default Loader;
