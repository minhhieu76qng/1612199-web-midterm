import React from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import LocalStorage from '../../utils/LocalStorage';
import './index.scss';

const NavBar = ({ user, logOut }) => {
  const handleLogout = event => {
    event.preventDefault();
    LocalStorage.removeToken();
    logOut();
  };

  const location = useLocation();
  const { url } = useRouteMatch();

  return (
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['/']}
      selectedKeys={[url]}
      style={{ lineHeight: '40px' }}
    >
      <Menu.Item key='/account'>
        <Link to={{ pathname: '/account', state: { from: location.pathname } }}>
          <Icon type='user' />
          Account
        </Link>
      </Menu.Item>

      <Menu.Item key='/game'>
        <Link to={{ pathname: '/game', state: { from: location.pathname } }}>
          <Icon type='coffee' />
          Game
        </Link>
      </Menu.Item>

      {!user && (
        <Menu.Item className='float-right'>
          <Link to='/register'>
            <Icon type='user-add' />
            Register
          </Link>
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item className='float-right'>
          <Link to='/login'>
            <Icon type='login' />
            Login
          </Link>
        </Menu.Item>
      )}

      {user && (
        <Menu.Item className='float-right'>
          <Button type='link' onClick={event => handleLogout(event)}>
            <Icon type='logout' />
            Logout
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default NavBar;
