import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Sider, Content } = Layout;

const AccountLayout = ({ children }) => {
  const location = useLocation();
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: 'calc(100vh - 64px)',
          position: 'fixed',
          left: 0
        }}
      >
        <Menu
          mode='inline'
          defaultSelectedKeys='view'
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key='view'>
            <Link to='/account'>
              <Icon type='profile' /> View profiles
            </Link>
          </Menu.Item>
          <Menu.Item key='profile'>
            {/* <Link to='/account/edit/profiles'> */}
            <Link
              to={{
                pathname: '/account/edit/profiles',
                state: { from: location.pathname }
              }}
            >
              <Icon type='profile' /> Update profiles
            </Link>
          </Menu.Item>
          <Menu.Item key='password'>
            {/* <Link to='/account/edit/password'> */}
            <Link
              to={{
                pathname: '/account/edit/password',
                state: { from: location.pathname }
              }}
            >
              <Icon type='key' /> Change password
            </Link>
          </Menu.Item>
          <Menu.Item key='avatar'>
            <Link to='/account/edit/avatar'>
              <Icon type='picture' /> Upload avatar
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AccountLayout;
