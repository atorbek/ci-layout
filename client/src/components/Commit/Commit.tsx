import React from 'react';
import './Commit.css';
import './Info/Commit-Info.css';
import './Author/Commit-Author.css';
import CommitInfo from './Info/Commit-Info';
import Icon from '../Icon';
import Text from '../Text';
import CommitAuthor from './Author/Commit-Author';
import { cn } from '../../config';

declare interface CommitProps {
  branch: string;
  commitHash: string;
  author: string;
  mix?: string[];
}
const Commit: React.FC<CommitProps> = ({ branch, commitHash, author, mix }) => {
  return (
    <div className={cn('commit')({}, mix)}>
      <CommitInfo>
        <Icon type="commit" indentR="xxs" />
        <Text size="m" lineHeight="xxxs" indentR="xxs">
          {branch}
        </Text>
        <Text size="m" lineHeight="xxxs" view="secondary2">
          {commitHash}
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
