import React from 'react';
import { connect } from 'react-redux';
import '../Text/Text.css';
import '../Text/_size/Text_size_xxxl.css';
import '../Text/_size/Text_size_m.css';
import '../Text/_view/Text_view_secodary.css';
import '../Text/_line-height/Text_line-height_xl.css';
import '../Text/_indent-r/Text_indent-r_xs.css';
import Header from '../Header';
import { ButtonText } from '../Button';
import Icon from '../Icon';
import Layout from '../Layout';
import LayoutContainer from '../Layout/Container/Layout-Container';
import Footer from '../Footer';
import {
  getIsLoad,
  getIsSettings,
  fetchSettings
} from '../../modules/StartPage';
import { Redirect } from 'react-router-dom';
import Settings from '../Settings';
import SettingsContent from '../Settings/Content/Settings-Content';
import SettingsAction from '../Settings/Action/Settings-Action';
import Text from '../Text';
import { compose } from 'redux';
import LinkButton from '../ButtonLink';
const StartPage = ({ isSettings, isLoad }) => {
  if (!isSettings) {
    return isLoad ? (
      'Loading...'
    ) : (
      <>
        <Header
          title="School CI server"
          titleMix={[
            'text',
            ' text_size_xxxl',
            'text_view_secondary',
            'text_line-height_xl'
          ]}
        >
          <LinkButton
            to="/settings"
            size="xl"
            view="control"
            form="round"
            indentR="xs"
          >
            <Icon type="gear" size="s" view="brand" mix={['button__icon']} />
            <ButtonText>Settings</ButtonText>
          </LinkButton>
        </Header>
        <Layout verticalAlign="center" spaceH="m">
          <LayoutContainer size="m" align="center">
            <Settings>
              <SettingsContent distribute="center">
                <Icon
                  type="settings"
                  size="s"
                  view="brand"
                  mix={['settings__content_icon']}
                />
                <Text
                  view="primary"
                  size="m"
                  align="center"
                  mix={['settings__content_text']}
                >
                  Configure repository connection and synchronization settings
                </Text>
              </SettingsContent>
              <SettingsAction distribute="center">
                <LinkButton
                  to="/settings"
                  size="xxxxl"
                  view="action"
                  form="round"
                >
                  Open settings
                </LinkButton>
              </SettingsAction>
            </Settings>
          </LayoutContainer>
        </Layout>
        <Footer />
      </>
    );
  }

  return <Redirect to="/history" />;
};

const mapStateToProps = (state) => ({
  isLoad: getIsLoad(state),
  isSettings: getIsSettings(state)
});
const mapDispatchToProps = { fetchSettings };

export default compose(connect(mapStateToProps, mapDispatchToProps))(StartPage);
