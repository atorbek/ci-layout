import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../../components/Text/Text.css';
import '../../components/Text/_size/Text_size_xxxl.css';
import '../../components/Text/_view/Text_view_primary.css';
import '../../components/Text/_line-height/Text_line-height_xl.css';
import Header from '../../components/Header';
import Button, { ButtonText } from '../../components/Button';
import Icon from '../../components/Icon';
import Layout from '../../components/Layout';
import LayoutContainer from '../../components/Layout/Container/Layout-Container';
import BuildHistory from '../../components/BuildHistory';
import Footer from '../../components/Footer';
import {
  fetchBuildsAsync,
  handleShowMore,
  getBuilds,
  isLoadBuilds,
  getIsAdded,
  getBuildId,
  getRepoName,
  useBuildsSelector,
  useRunSelector
} from '../../modules/HistoryPage';

import LinkButton from '../../components/ButtonLink';
import RunBuildModal from '../../components/RunBuildModal';
import { useTypedSelector } from '../../modules/StartPage';

const HistoryPage = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const dispatch = useDispatch();
  const builds = useBuildsSelector(getBuilds);
  const isLoad = useBuildsSelector(isLoadBuilds);
  const repoName = useTypedSelector(getRepoName);
  const isAdded = useRunSelector(getIsAdded);
  const buildId = useRunSelector(getBuildId);

  useEffect(() => {
    if (isShowMore) {
      dispatch(handleShowMore({ offset, limit }));
      setIsShowMore(!isShowMore);
    } else {
      dispatch(fetchBuildsAsync.request({ offset, limit }));
    }
  }, [dispatch, limit, offset]);

  const handleClickShowMore = () => {
    setIsShowMore(!isShowMore);
    setLimit(limit);
    if (builds.length < offset) {
      return;
    }
    setOffset(offset + limit);
  };

  const handleClickRunBuild = (): void => {
    setIsModal(!isModal);
  };

  const renderBuilds = (builds: Build[]) =>
    builds.map((b) => (
      <BuildHistory
        key={b.id}
        to={`build/${b.id}`}
        buildNumber={b.buildNumber}
        commitMessage={b.commitMessage}
        branchName={b.branchName}
        authorName={b.authorName}
        commitHash={b.commitHash}
        start={b.start}
        status={b.status}
        duration={b.duration}
      />
    ));
  return isAdded ? (
    <Redirect to={`build/${buildId}`} />
  ) : (
    <>
      <Header
        title={repoName}
        titleMix={[
          'text',
          ' text_size_xxxl',
          'text_view_primary',
          'text_line-height_xl'
        ]}
      >
        <Button
          onClick={handleClickRunBuild}
          size="xl"
          color="control"
          form="round"
          indentR="xs"
          mix={['header__button']}
        >
          <Icon type="play" size="s" view="brand" mix={['button__icon']} />
          <ButtonText>Run build</ButtonText>
        </Button>
        <LinkButton to="/settings" size="l" color="control" form="round">
          <Icon type="gear" size="s" view="brand" mix={['button__icon']} />
        </LinkButton>
      </Header>
      <Layout
        verticalAlign="top"
        spaceH="m"
        direction="column"
        mix={['history']}
      >
        <LayoutContainer size="m" align="center">
          {isLoad ? 'Loading...' : renderBuilds(builds)}
        </LayoutContainer>
        <LayoutContainer size="m" align="center" indentB="l">
          <Button
            size="xl"
            color="control"
            form="round"
            onClick={handleClickShowMore}
          >
            Show more
          </Button>
        </LayoutContainer>
      </Layout>
      <Footer />
      {isModal && <RunBuildModal handleClickRunBuild={handleClickRunBuild} />}
    </>
  );
};

export default HistoryPage;
