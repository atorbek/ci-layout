import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import '../Theme/Theme.css';
import Page from '../Page';
import History from '../HistoryPage';
import Start from '../StartPage';
import Settings from '../SettingsPage';
import Build from '../BuildPage';
import PrivateRoute from '../CustomRoute';
import { fetchSettings } from '../../modules/StartPage';

const App = ({ fetchSettings }) => {
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <BrowserRouter>
      <Page
        mix={[
          'theme',
          'theme_color_project-default',
          'theme_font_ys-text',
          'theme_size_default',
          'theme_space_default',
          'theme_gap_small'
        ]}
      >
        <Switch>
          <PrivateRoute path="/history" component={History} exact />
          <Route path="/" component={Start} exact />
          <Route path="/settings" component={Settings} exact />
          <Route path="/build/:id" component={Build} exact />
          <Redirect to="/" />
        </Switch>
      </Page>
    </BrowserRouter>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = { fetchSettings };

export default connect(mapStateToProps, mapDispatchToProps)(App);
