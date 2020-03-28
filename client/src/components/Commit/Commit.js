import React from 'react';
import './Commit.css';
import './Info/Commit-Info.css';
import './Author/Commit-Author.css';
import { withNaming } from '@bem-react/classname';
import CommitInfo from './Info/Commit-Info';
import Icon from '../Icon';
import Text from '../Text';
import CommitAuthor from './Author/Commit-Author';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const Commit = ({ branch, hash, author, mix }) => {
  return (
    <div className={cn('commit')({}, mix)}>
      <CommitInfo>
        <Icon type="commit" indentR="xxs" />
        <Text size="m" lineHeight="xxxs" indentR="xxs">
          {branch}
        </Text>
        <Text size="m" lineHeight="xxxs" view="secondary2">
          {hash}
        </Text>
      </CommitInfo>
      <CommitAuthor>
        <Icon type="user" indentR="xxs" />
        <Text size="m" lineHeight="xxxs">
          {author}
        </Text>
      </CommitAuthor>
    </div>
  );
};

export default Commit;
