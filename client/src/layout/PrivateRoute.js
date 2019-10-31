import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import LocalStorage from '../utils/LocalStorage';

const PrivateRoute = ({ user, getProfile, children, ...rest }) => {
  // kiem tra token va user co hop le hay khong
  const storeUser = LocalStorage.getUser();

  if (!storeUser) {
    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    );
  }

  if (!user) {
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
  return <Route {...rest} render={() => children} />;
};

export default PrivateRoute;
