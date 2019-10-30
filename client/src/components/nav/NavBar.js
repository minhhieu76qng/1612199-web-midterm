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
    <Menu theme='dark' mode='horizontal' defaultSelectedKeys='home'>
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
      {user && (
        <Menu.SubMenu
          className='float-right'
          key='sub-menu'
          title={
            <Link className='submenu-title-wrapper' to='/account'>
              <Icon type='setting' />
              Account Settings
            </Link>
          }
        >
          <Menu.Item>
            <Link to='/account/edit/profiles'>
              <Icon type='profile' /> Update profiles
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/account/edit/password'>
              <Icon type='key' /> Change password
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/account/edit/avatar'>
              <Icon type='picture' /> Upload avatar
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );
};

export default NavBar;
