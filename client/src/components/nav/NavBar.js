import React from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import LocalStorage from '../../utils/LocalStorage';
import './index.scss';

const NavBar = ({ user, logOut }) => {
  const handleLogout = event => {
    event.preventDefault();
    LocalStorage.removeToken();
    logOut();
  };
  return (
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys='home'
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key='home'>
        <Link to='/'>
          <Icon type='home' />
          Home
        </Link>
      </Menu.Item>

      <Menu.Item key='game'>
        <Link to='/game'>
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
