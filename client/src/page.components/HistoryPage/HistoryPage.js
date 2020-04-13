import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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
  fetchBuilds,
  handleShowMore,
  getBuilds,
  isLoadBuilds,
  getIsAdded,
  getBuildId
} from '../../modules/HistoryPage';

import { compose } from 'redux';
import LinkButton from '../../components/ButtonLink';
import RunBuildModal from '../../components/RunBuildModal';

const HistoryPage = ({
  fetchBuilds,
  handleShowMore,
  repoName,
  builds,
  isLoadBuilds,
  isAdded,
  buildId
}) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (isShowMore) {
      handleShowMore({ offset, limit });
      setIsShowMore(!isShowMore);
    } else {
      fetchBuilds({ offset, limit });
    }
  }, [limit, offset]);

  const handleClickShowMore = () => {
    setIsShowMore(!isShowMore);
    setLimit(limit);
    if (builds.length < offset) {
      return;
    }
    setOffset(offset + limit);
  };

  const handleClickRunBuild = () => {
    setIsModal(!isModal);
  };

  const renderBuilds = (builds) =>
    builds.map((b) => (
      <BuildHistory
        key={b.id}
        to={`build/${b.id}`}
        buildNumber={b.buildNumber}
        commitMessage={b.commitMessage}
        branchName={b.branchName}
        authorName={b.authorName}
        hash={b.commitHash}
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
        <LinkButton
          onClick={handleClickRunBuild}
          size="xl"
          view="control"
          form="round"
          indentR="xs"
          mix={['header__button']}
        >
          <Icon type="play" size="s" view="brand" mix={['button__icon']} />
          <ButtonText>Run build</ButtonText>
        </LinkButton>
        <LinkButton to="/settings" size="l" view="control" form="round">
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
          {isLoadBuilds ? 'Loading...' : renderBuilds(builds)}
        </LayoutContainer>
        <LayoutContainer size="m" align="center" indentB="l">
          <Button
            size="xl"
            view="control"
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

const mapStateToProps = (state) => ({
  builds: getBuilds(state),
  isLoadBuilds: isLoadBuilds(state),
  repoName: state.settings.data.repoName,
  isAdded: getIsAdded(state),
  buildId: getBuildId(state)
});
const mapDispatchToProps = {
  fetchBuilds,
  handleShowMore
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  HistoryPage
);
