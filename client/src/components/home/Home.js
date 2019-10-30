import React from 'react';
import { Row, Col, Card } from 'antd';

const Home = ({ user }) => {
  return (
    <div>
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
