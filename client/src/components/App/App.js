import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '../Theme/Theme.css';
import Page from '../Page';
import History from '../HistoryPage';
import Start from '../StartPage';
import Settings from '../SettingsPage';
import Build from '../BuildPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
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
          <Route path="/" component={Start} exact />
          <Route path="/settings" component={Settings} exact />
          <Route path="/build/:id" component={Build} exact />
          <PrivateRoute path="/history" component={History} exact />
        </Page>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
