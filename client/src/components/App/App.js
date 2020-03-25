import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Page from '../Page';
import Header from '../Header';
import Layout from '../Layout';
import Footer from '../Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Page>
        <Header />
        <Layout />
        <Footer />
      </Page>
    </BrowserRouter>
  );
};

export default App;
