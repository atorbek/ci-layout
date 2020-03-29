import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsSettings } from '../../modules/StartPage/StartPage';

const PrivateRoute = ({ isSettings, component: Component, ...rest }) => {
  const renderRoute = (props) => {
    return isSettings ? <Component {...props} /> : <Redirect to="/" />;
  };

  return <Route {...rest} render={renderRoute} />;
};

export default connect((state) => ({
  isSettings: getIsSettings(state)
}))(PrivateRoute);
