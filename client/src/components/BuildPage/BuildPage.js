import React, { useEffect } from 'react';
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
  getBuild,
  getLog,
  isLoadBuild,
  isLoadLog
} from '../../modules/BuildPage';
const BuildPage = ({
  match: {
    params: { id: buildId }
  },
  fetchLog,
  fetchBuild,
  build,
  log,
  isBuild,
  isLog,
  repoName
}) => {
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
          <ButtonText>Rebuild</ButtonText>
        </Button>
        <Button size="l" view="control" form="round">
          <Icon type="rebuild" size="s" view="brand" mix={['button__icon']} />
        </Button>
      </Header>
      <Layout verticalAlign="top" spaceH="m" direction="column">
        <LayoutContainer size="m" align="center">
          {isBuild && isLog && (
            <>
              {renderBuild(build)}
              {build.start && <BuildLog log={log} indentB="l" space="s" />}
            </>
          )}
        </LayoutContainer>
      </Layout>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  // repoName: state.settings.data.repoName
  build: getBuild(state),
  log: getLog(state),
  isBuild: isLoadBuild(state),
  isLog: isLoadLog(state)
});
const mapDispatchToProps = { fetchBuild, fetchLog };

export default connect(mapStateToProps, mapDispatchToProps)(BuildPage);
