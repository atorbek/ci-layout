import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Page from '../Page';
import Header from '../Header';
import Layout from '../Layout';
import Footer from '../Footer';
import HeaderTitle from '../Header/Title/Header-Title';
import HeaderContent from '../Header/Content/Header-Content';
import HeaderButtons from '../Header/Buttons/Header-Buttons';
import Button from '../Button';
import Icon from '../Icon';
import ButtonText from '../Button/Text/Button-Text';

const App = () => {
  return (
    <BrowserRouter>
      <Page>
        <Header>
          <HeaderContent>
            <HeaderTitle>philip1967/my-awesome-repo</HeaderTitle>
            <HeaderButtons>
              <Button>
                <Icon />
                <ButtonText>Run build</ButtonText>
              </Button>
            </HeaderButtons>
          </HeaderContent>
        </Header>
        <Layout />
        <Footer />
      </Page>
    </BrowserRouter>
  );
};

export default App;
