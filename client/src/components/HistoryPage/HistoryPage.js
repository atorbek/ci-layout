import React, { useEffect, useState } from 'react';
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
import HeaderButtons from '../Header/Buttons/Header-Buttons';
import Button, { ButtonText } from '../Button';
import Icon from '../Icon';
import Layout from '../Layout';
import LayoutContainer from '../Layout/Container/Layout-Container';
import BuildHistory from '../BuildHistory';
import List from '../List/List';
import ListItem from '../List/Item/List-Item';
import FooterContent from '../Footer/Content/FooterContent';
import FooterCopyright from '../Footer/Copyright/FooterCopyright';
import Footer from '../Footer';
import FooterList from '../Footer/List/FooterList';
// import { withRouter, NavLink } from 'react-router-dom';

import { fetchBuilds, getBuilds } from '../../modules/HistoryPage';

import { compose } from 'redux';

const HistoryPage = ({ fetchBuilds, builds }) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchBuilds({ offset, limit });
  });

  const handleClickShowMore = () => {
    fetchBuilds({ offset, limit });
    setLimit(limit);
    setOffset(offset + limit);
  };

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
              <ButtonText>Run build</ButtonText>
            </Button>
            <Button size="l" view="control" form="round">
              {/*<NavLink to="/settings" exact>*/}
              <Icon type="gear" size="s" view="brand" mix={['button__icon']} />
              {/*</NavLink>*/}
            </Button>
          </HeaderButtons>
        </HeaderContent>
      </Header>
      <Layout verticalAlign="top" spaceH="m" direction="column">
        <LayoutContainer size="m" align="center">
          {builds.map((build) => (
            <BuildHistory
              key={build.id}
              id={build.buildNumber}
              msg={build.commitMessage}
              branch={build.branchName}
              author={build.authorName}
              hash={build.commitHash}
              // dateTime={build.dateTime}
              // durationTime={build.durationTime}
              indentT="xs"
            />
          ))}
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
  builds: getBuilds(state)
});
const mapDispatchToProps = {
  fetchBuilds
};

export default compose(
  // withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(HistoryPage);
