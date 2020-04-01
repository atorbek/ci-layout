import React from 'react';
import connect from 'react-redux/es/connect/connect';
// import Convert from 'ansi-to-html';
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
import Text from '../Text';
const BuildPage = ({ repoName }) => {
  // const convert = new Convert({ fg: '#000', bg: '#000' });

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
          <BuildHistory
            id="#1368"
            msg="add documentation for postgres scaler"
            indentT="xs"
            indentB="s"
          />
          <BuildLog indentB="l" space="s">
            <Text size="xs">test</Text>
          </BuildLog>
        </LayoutContainer>
      </Layout>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  repoName: state.settings.data.repoName
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BuildPage);
