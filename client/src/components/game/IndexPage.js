import React, { useState, useEffect } from 'react';
import { Card, Button, Spin } from 'antd';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import socketio from '../../socketio';
import LocalStorage from '../../utils/LocalStorage';

const IndexPage = ({ setRoom }) => {
  document.title = 'Game Lobby';

  const socket = socketio;

  const { url } = useRouteMatch();
  const [matchMaking, setMatchMaking] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    const user = LocalStorage.getUser();

    if (!(user && user.id)) {
      return;
    }

    socket.emit('matchMaking', user.id);
    setMatchMaking(true);
  };
  socket.on('created_room', roomID => {
    // emit de join vao roomID
    socket.emit('joinGame', roomID, () => {
      // setstate -> redirect
      // clear state
      // clearMatch();
      setMatchMaking(false);
      setRoom(roomID);
      history.push(`${url}/with-human`);
    });
  });

  useEffect(() => {
    return () => {
      socket.off('created_room');
    };
  }, []);

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
            style={{ maxWidth: 500 }}
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
            style={{ maxWidth: 500 }}
            cover={
              <img
                src='http://www.gamersonlinux.com/forum/attachments/league81-jpg.10714/'
                alt='Play card'
              />
            }
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
