import React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Sider, Content } = Layout;

const AccountLayout = ({ children }) => {
  const location = useLocation();
  const { url } = useRouteMatch();
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
          defaultSelectedKeys={url}
          selectedKeys={[location.pathname]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key={url}>
            <Link
              to={{ pathname: `${url}`, state: { from: location.pathname } }}
            >
              <Icon type='profile' /> View profiles
            </Link>
          </Menu.Item>
          <Menu.Item key={`${url}/edit/profiles`}>
            {/* <Link to='/account/edit/profiles'> */}
            <Link
              to={{
                pathname: `${url}/edit/profiles`,
                state: { from: location.pathname }
              }}
            >
              <Icon type='profile' /> Update profiles
            </Link>
          </Menu.Item>
          <Menu.Item key={`${url}/edit/password`}>
            {/* <Link to='/account/edit/password'> */}
            <Link
              to={{
                pathname: `${url}/edit/password`,
                state: { from: location.pathname }
              }}
            >
              <Icon type='key' /> Change password
            </Link>
          </Menu.Item>
          <Menu.Item key={`${url}/edit/avatar`}>
            <Link
              to={{
                pathname: `${url}/edit/avatar`,
                state: { from: location.pathname }
              }}
            >
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
