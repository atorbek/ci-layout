import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../Text/Text.css';
import '../Text/_size/Text_size_xxxl.css';
import '../Text/_view/Text_view_primary.css';
import '../Text/_line-height/Text_line-height_xl.css';
import Header from '../Header';
import Button, { ButtonText } from '../Button';
import Icon from '../Icon';
import Layout from '../Layout';
import LayoutContainer from '../Layout/Container/Layout-Container';
import BuildHistory from '../BuildHistory';
import Footer from '../Footer';
import {
  fetchBuilds,
  handleShowMore,
  getBuilds,
  isLoadBuilds
} from '../../modules/HistoryPage';

import { compose } from 'redux';
import LinkButton from '../ButtonLink';
import SettingsModal from '../RunBuildModal';

const HistoryPage = ({
  fetchBuilds,
  handleShowMore,
  repoName,
  builds,
  isLoadBuilds
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
  }, [fetchBuilds, limit, offset]);

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
  return (
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
        >
          <Icon type="play" size="s" view="brand" mix={['button__icon']} />
          <ButtonText>Run build</ButtonText>
        </LinkButton>
        <LinkButton to="/settings" size="l" view="control" form="round">
          <Icon type="gear" size="s" view="brand" mix={['button__icon']} />
        </LinkButton>
      </Header>
      <Layout verticalAlign="top" spaceH="m" direction="column">
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
      {isModal && <SettingsModal handleClickRunBuild={handleClickRunBuild} />}
    </>
  );
};

const mapStateToProps = (state) => ({
  builds: getBuilds(state),
  isLoadBuilds: isLoadBuilds(state),
  repoName: state.settings.data.repoName
});
const mapDispatchToProps = {
  fetchBuilds,
  handleShowMore
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  HistoryPage
);
