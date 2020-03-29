import React from 'react';
import './Build-log.css';
import './_indent-b/Build-log_indent-b_l.css';
import './_space/build-log_space_s.css';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const BuildLog = ({ indentB, space, mix, children }) => {
  return (
    <div className={cn('build-log')({ indentB, space }, mix)}>{children}</div>
  );
};

export default BuildLog;
