import React from 'react';
import { Card, Button } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';

const IndexPage = () => {
  const { url } = useRouteMatch();
  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-around', marginTop: 30 }}
    >
      <Card
        hoverable
        style={{ maxWidth: 500, flexGrow: 1 }}
        cover={
          <img
            src='http://fs5.directupload.net/images/170310/4vxzteu6.jpg'
            alt='Play card'
          />
        }
      >
        <Link to={`${url}/with-bot`}>
          <Button type='primary' block size='large'>
            Play now
          </Button>
        </Link>
      </Card>
      <Card
        hoverable
        style={{ maxWidth: 500, flexGrow: 1 }}
        cover={
          <img
            src='http://www.gamersonlinux.com/forum/attachments/league81-jpg.10714/'
            alt='Play card'
          />
        }
      >
        <Link to={`${url}/with-human`}>
          <Button type='primary' block size='large'>
            Play now
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default IndexPage;
