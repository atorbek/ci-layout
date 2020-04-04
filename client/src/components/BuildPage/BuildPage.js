import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../Text/Text.css';
import '../Text/_size/Text_size_xxxl.css';
import '../Text/_view/Text_view_primary.css';
import '../Text/_line-height/Text_line-height_xl.css';
import Header from '../Header';
import Layout from '../Layout';
import LayoutContainer from '../Layout/Container/Layout-Container';
import Footer from '../Footer';
import Button, { ButtonText } from '../Button';
import Icon from '../Icon';
import BuildHistory from '../BuildHistory';
import BuildLog from '../BuildLog';
import {
  fetchBuild,
  fetchLog,
  handleRebuild,
  getBuild,
  getLog,
  isLoadBuild,
  isLoadLog,
  isRebuild,
  getRebuild
} from '../../modules/BuildPage';
import ButtonLink from '../ButtonLink';
import Loader from '../Loader/Loader';
import { compose } from 'redux';
const BuildPage = ({
  match: {
    params: { id: buildId }
  },
  fetchLog,
  fetchBuild,
  handleRebuild,
  build,
  rebuild,
  log,
  isBuild,
  isLog,
  isRebuild,
  repoName
}) => {
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    fetchBuild({ id: buildId });
    fetchLog({ id: buildId });
  }, [fetchBuild, fetchLog, buildId]);

  const renderBuild = (b) => (
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
    />
  );

  const handleClickRebuild = () => {
    setIsRedirect(!isRedirect);
    handleRebuild(build.commitHash);
  };

  const render = () => {
    if (isRebuild && isRedirect) {
      setIsRedirect(!isRedirect);
      return <Redirect to={`/build/${rebuild.id}`} />;
    }

    return isBuild && isLog ? (
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
            onClick={handleClickRebuild}
            size="xl"
            view="control"
            form="round"
            indentR="xs"
          >
            <Icon type="play" size="s" view="brand" mix={['button__icon']} />
            <ButtonText>Rebuild</ButtonText>
          </Button>
          <ButtonLink to="/settings" size="l" view="control" form="round">
            <Icon type="gear" size="s" view="brand" mix={['button__icon']} />
          </ButtonLink>
        </Header>
        <Layout verticalAlign="top" spaceH="m" direction="column">
          <LayoutContainer size="m" align="center">
            <>
              {renderBuild(build)}
              {build.start && <BuildLog log={log} indentB="l" space="s" />}
            </>
          </LayoutContainer>
        </Layout>
        <Footer />
      </>
    ) : (
      <Loader />
    );
  };

  return render();
};

const mapStateToProps = (state) => ({
  // repoName: state.settings.data.repoName,
  build: getBuild(state),
  rebuild: getRebuild(state),
  log: getLog(state),
  isBuild: isLoadBuild(state),
  isLog: isLoadLog(state),
  isRebuild: isRebuild(state)
});
const mapDispatchToProps = { fetchBuild, fetchLog, handleRebuild };

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(BuildPage);
