import React, { useEffect } from 'react';
import '../Text/Text.css';
import '../Text/_size/Text_size_xxxl.css';
import '../Text/_size/Text_size_m.css';
import '../Text/_view/Text_view_primary.css';
import '../Text/_line-height/Text_line-height_xl.css';
import '../Text/_line-height/Text_line-height_xxxs.css';
import '../Text/_indent-r/Text_indent-r_xs.css';
import '../Header/Header.css';
import '../Header/_space/Header_spaceV_l.css';
import '../Header/_space/Header_spaceH_m.css';
import Header from '../Header';
import HeaderContent from '../Header/Content/Header-Content';
import HeaderTitle from '../Header/Title/Header-Title';
import Layout from '../Layout';
import LayoutContainer from '../Layout/Container/Layout-Container';
import List from '../List/List';
import ListItem from '../List/Item/List-Item';
import FooterContent from '../Footer/Content/FooterContent';
import FooterCopyright from '../Footer/Copyright/FooterCopyright';
import Footer from '../Footer';
import FooterList from '../Footer/List/FooterList';
import FormSettings from '../FormSettings/Form-settings';
import {
  fetchSettings,
  getIsLoad,
  getIsSettings
} from '../../modules/StartPage';
import { connect } from 'react-redux';
const SettingsPage = ({ fetchSettings }) => {
  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <>
      <Header spaceV="l" spaceH="m">
        <HeaderContent>
          <HeaderTitle
            mix={[
              'text',
              ' text_size_xxxl',
              'text_view_secondary',
              'text_line-height_xl'
            ]}
          >
            School CI server
          </HeaderTitle>
        </HeaderContent>
      </Header>
      <Layout verticalAlign="top" spaceH="m" direction="column">
        <LayoutContainer size="m" align="center">
          <FormSettings mix={['mix']} />
        </LayoutContainer>
      </Layout>
      <Footer spaceH="m">
        <FooterContent>
          <FooterList>
            <List indentT="xs">
              <ListItem
                mix={[
                  'text',
                  'text_lineHeight_xxxs',
                  'text_size_m',
                  'text_indentR_xs'
                ]}
              >
                Support
              </ListItem>
              <ListItem mix={['text', 'text_lineHeight_xxxs', 'text_size_m']}>
                Learning
              </ListItem>
            </List>
          </FooterList>
          <FooterCopyright
            mix={[
              'text',
              'text_lineHeight_xxs',
              'text_size_m',
              'text_view_secondary',
              'text_indentR_xs'
            ]}
          >
            © 2020 Your Name
          </FooterCopyright>
        </FooterContent>
      </Footer>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoad: getIsLoad(state),
  isSettings: getIsSettings(state)
});
const mapDispatchToProps = { fetchSettings };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
