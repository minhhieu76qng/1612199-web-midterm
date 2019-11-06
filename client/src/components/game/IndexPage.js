import React, { useState, useEffect } from 'react';
import { Card, Button, Spin } from 'antd';
import { Link, useRouteMatch, Redirect } from 'react-router-dom';
import socketio from '../../socketio';
import LocalStorage from '../../utils/LocalStorage';

const IndexPage = ({ setRoom, push }) => {
  const s = socketio.open();

  useEffect(() => {
    return () => {
      s.emit('cancle_lobby');
      s.off('created_room');
    };
  }, []);
  document.title = 'Game Lobby';

  const { url } = useRouteMatch();
  const [matchMaking, setMatchMaking] = useState(false);

  const user = LocalStorage.getUser();

  if (!(user && user.id)) {
    return <Redirect to='/login' />;
  }

  s.emit('set_name', user.id);

  const handleClick = () => {
    s.emit('match_making', user.id);
    setMatchMaking(true);
  };

  s.on('created_room', roomID => {
    s.emit('join_game', roomID, () => {
      setMatchMaking(false);
      setRoom(roomID);
      push(`${url}/with-human`);
    });
  });

  return (
    <div style={{ flexGrow: 1 }}>
      <Spin
        spinning={matchMaking}
        size='large'
        delay={500}
        tip='Finding match...'
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 30
          }}
        >
          <Card
            hoverable
            style={{ maxWidth: 350 }}
            title='Play with Bot'
            cover={<img src='/gameWithBot.PNG' alt='Play card' />}
          >
            <Link to={`${url}/with-bot`}>
              <Button type='primary' block size='large'>
                Play now
              </Button>
            </Link>
          </Card>
          <Card
            hoverable
            style={{ maxWidth: 350 }}
            title='Play with Human'
            cover={<img src='/gameWithHuman.PNG' alt='Play card' />}
          >
            <Button type='primary' block size='large' onClick={handleClick}>
              Play now
            </Button>
          </Card>
        </div>
      </Spin>
    </div>
  );
};

export default IndexPage;
