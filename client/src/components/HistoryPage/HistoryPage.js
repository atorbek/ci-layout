import React, { useEffect, useState } from 'react';
import connect from 'react-redux/es/connect/connect';
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
// import { withRouter, NavLink } from 'react-router-dom';

import {
  fetchBuilds,
  getBuilds,
  isLoadBuilds
} from '../../modules/HistoryPage';

import { compose } from 'redux';

const HistoryPage = ({ fetchBuilds, repoName, builds, isLoadBuilds }) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchBuilds({ offset, limit });
  }, [offset]);

  const handleClickShowMore = () => {
    setLimit(limit);
    if (builds.length < offset) {
      return;
    }
    setOffset(offset + limit);
  };

  const renderBuilds = (builds) =>
    builds.map((b) => (
      <BuildHistory
        key={b.id}
        buildNumber={b.buildNumber}
        commitMessage={b.commitMessage}
        branchName={b.branchName}
        authorName={b.authorName}
        hash={b.commitHash}
        start={b.start}
        status={b.status}
        duration={b.duration}
        indentT="xs"
        indentB="xs"
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
        <Button size="xl" view="control" form="round" indentR="xs">
          <Icon type="play" size="s" view="brand" mix={['button__icon']} />
          <ButtonText>Run build</ButtonText>
        </Button>
        <Button size="l" view="control" form="round">
          {/*<NavLink to="/settings" exact>*/}
          <Icon type="gear" size="s" view="brand" mix={['button__icon']} />
          {/*</NavLink>*/}
        </Button>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  builds: getBuilds(state),
  isLoadBuilds: isLoadBuilds(state),
  repoName: state.settings.data.repoName
});
const mapDispatchToProps = {
  fetchBuilds
};

export default compose(
  // withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(HistoryPage);
