import React from 'react';
import '../../components/Text/Text.css';
import '../../components/Text/_size/Text_size_xxxl.css';
import '../../components/Text/_size/Text_size_m.css';
import '../../components/Text/_view/Text_view_secodary.css';
import '../../components/Text/_line-height/Text_line-height_xl.css';
import '../../components/Text/_indent-r/Text_indent-r_xs.css';
import Header from '../../components/Header';
import { ButtonText } from '../../components/Button';
import Icon from '../../components/Icon';
import Layout from '../../components/Layout';
import LayoutContainer from '../../components/Layout/Container/Layout-Container';
import Footer from '../../components/Footer';
import { getIsLoad, getIsSettings } from '../../modules/StartPage';
import { Redirect } from 'react-router-dom';
import Settings from '../../components/Settings';
import SettingsContent from '../../components/Settings/Content/Settings-Content';
import SettingsAction from '../../components/Settings/Action/Settings-Action';
import Text from '../../components/Text';
import LinkButton from '../../components/ButtonLink';
import Loader from '../../components/Loader';
import { useTypedSelector } from '../../modules/StartPage';

const StartPage = () => {
  const isSettings = useTypedSelector(getIsSettings);
  const isLoad = useTypedSelector(getIsLoad);

  if (!isSettings) {
    return isLoad ? (
      <Loader />
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
            color="control"
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
                  color="action"
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

export default StartPage;
