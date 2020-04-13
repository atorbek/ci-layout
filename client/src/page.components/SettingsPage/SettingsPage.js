import React from 'react';
import '../../components/Text/Text.css';
import '../../components/Text/_size/Text_size_xxxl.css';
import '../../components/Text/_view/Text_view_secodary.css';
import '../../components/Text/_line-height/Text_line-height_xl.css';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import LayoutContainer from '../../components/Layout/Container/Layout-Container';
import Footer from '../../components/Footer';
import FormSettings from '../../components/FormSettings/Form-settings';
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
