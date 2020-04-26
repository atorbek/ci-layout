import React from 'react';
import Convert from 'ansi-to-html';
import './Build-log.css';
import './_indent-b/Build-log_indent-b_l.css';
import './_space/build-log_space_s.css';
import Text from '../Text';
import { cn } from '../../config';

// declare interface BuildLogProps {
//   log: string;
//   indentB: string;
//   space: string;
//   mix: string[];
// }

// : React.FC<BuildLogProps>
const BuildLog = ({ log, indentB, space, mix, ...props }) => {
  const convert = new Convert({ fg: '#000', bg: '#000' });
  return (
    <div className={cn('build-log')({ indentB, space }, mix)} {...props}>
      <Text
        tag="pre"
        size="xs"
        dangerouslySetInnerHTML={{ __html: convert.toHtml(log) }}
      />
    </div>
  );
};

export default BuildLog;
