import React, { useEffect } from 'react';
import { Menu, Icon, Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import LocalStorage from '../../utils/LocalStorage';
import './index.scss';

const Home = ({ user, getProfile, logOut }) => {
  const handleLogout = event => {
    event.preventDefault();
    LocalStorage.removeToken();
    logOut();
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item>
          <Link to='/'>
            <Icon type='home' />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item>
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

      {user && (
        <Row type='flex' justify='center' style={{ marginTop: '20px' }}>
          <Col xs={20} md={12}>
            <Card title='User infomation'>
              <p>
                Id:
                {user.id}
              </p>
              <p>
                Email:
                {user.email}
              </p>
              <p>
                Name:
                {user.name}
              </p>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Home;
