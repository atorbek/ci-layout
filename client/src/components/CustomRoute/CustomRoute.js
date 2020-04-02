import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsSettings } from '../../modules/StartPage/StartPage';

const CustomRoute = ({ isSettings, component: Component, ...rest }) => {
  const renderRoute = (props) => {
    return isSettings ? <Component {...props} /> : <Redirect to="/start" />;
  };

  return <Route {...rest} render={renderRoute} />;
};

export default connect((state) => ({
  isSettings: getIsSettings(state)
}))(CustomRoute);
