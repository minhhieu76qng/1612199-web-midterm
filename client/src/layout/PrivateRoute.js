import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import LocalStorage from '../utils/LocalStorage';
import Layout from './Layout';

const PrivateRoute = ({ user, getProfile, children, ...rest }) => {
  const token = LocalStorage.getToken() || null;

  if (!token && !user) {
    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    );
  }

  if (token && !user) {
    getProfile();
    const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />;

    return (
      <Spin
        size='large'
        tip='Loading...'
        className='loading-icon'
        indicator={antIcon}
      />
    );
  }
  return <Route {...rest} render={() => <Layout>{children}</Layout>} />;
};

export default PrivateRoute;
