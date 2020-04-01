import React from 'react';
import '../Text/Text.css';
import '../Text/_size/Text_size_xxxl.css';
import '../Text/_view/Text_view_secodary.css';
import '../Text/_line-height/Text_line-height_xl.css';
import Header from '../Header';
import Layout from '../Layout';
import LayoutContainer from '../Layout/Container/Layout-Container';
import Footer from '../Footer';
import FormSettings from '../FormSettings/Form-settings';
import { getIsLoad, getIsSettings } from '../../modules/StartPage';
import { connect } from 'react-redux';
const SettingsPage = () => {
  return (
    <>
      <Header
        title="School CI server"
        titleMix={[
          'text',
          ' text_size_xxxl',
          'text_view_secondary',
          'text_line-height_xl'
        ]}
      />
      <Layout verticalAlign="top" spaceH="m" direction="column">
        <LayoutContainer size="m" align="center">
          <FormSettings mix={['mix']} />
        </LayoutContainer>
      </Layout>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoad: getIsLoad(state),
  isSettings: getIsSettings(state)
});

export default connect(mapStateToProps, {})(SettingsPage);
