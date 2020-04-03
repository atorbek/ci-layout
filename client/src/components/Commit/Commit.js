import React from 'react';
import './Commit.css';
import './Info/Commit-Info.css';
import './Author/Commit-Author.css';
import CommitInfo from './Info/Commit-Info';
import Icon from '../Icon';
import Text from '../Text';
import CommitAuthor from './Author/Commit-Author';
import { cn } from '../../config';

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
