import React from 'react';
import connect from 'react-redux/es/connect/connect';
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
import HeaderButtons from '../Header/Buttons/Header-Buttons';
import Button, { ButtonText } from '../Button';
import Icon from '../Icon';
import BuildHistory from '../BuildHistory';
import BuildLog from '../BuildLog';
import Text from '../Text';
const BuildPage = () => {
  return (
    <>
      <Header spaceV="l" spaceH="m">
        <HeaderContent>
          <HeaderTitle
            mix={[
              'text',
              ' text_size_xxxl',
              'text_view_primary',
              'text_line-height_xl'
            ]}
          >
            philip1967/my-awesome-repo
          </HeaderTitle>
          <HeaderButtons>
            <Button size="xl" view="control" form="round" indentR="xs">
              <Icon type="play" size="s" view="brand" mix={['button__icon']} />
              <ButtonText>Rebuild</ButtonText>
            </Button>
            <Button size="l" view="control" form="round">
              <Icon
                type="rebuild"
                size="s"
                view="brand"
                mix={['button__icon']}
              />
            </Button>
          </HeaderButtons>
        </HeaderContent>
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BuildPage);
