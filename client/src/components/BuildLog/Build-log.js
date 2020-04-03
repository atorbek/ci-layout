import React from 'react';
import Convert from 'ansi-to-html';
import './Build-log.css';
import './_indent-b/Build-log_indent-b_l.css';
import './_space/build-log_space_s.css';
import { withNaming } from '@bem-react/classname';
import Text from '../Text';
const cn = withNaming({ e: '__', m: '_', v: '_' });

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
