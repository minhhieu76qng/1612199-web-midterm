import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import ChatBox from '../chat/Chat';
import socketio from '../../socketio';

const GameWithHuman = ({
  isFetching,
  roomID,
  clearMatch,
  fetchGameData,
  setFetching
}) => {
  const s = socketio.open();
  document.title = 'Play with human';

  // có một socket để fetch message và ván đấu về lại client
  // data là một object gồm board, messages, xIsNext
  useEffect(() => {
    setFetching(true);

    // emit fetch data
    s.emit('fetch_game_data', roomID);

    // nhận data
    s.on('receive_game_data', data => {
      const messages = [...data.messages];
      fetchGameData({ messages });

      setFetching(false);
    });
  }, []);

  useEffect(() => {
    return () => {
      s.off('receive_game_data');
      clearMatch();
    };
  }, []);

  if (!roomID) {
    return <Redirect to='/game' />;
  }

  return (
    <div className='game-wrapper' style={{ flexGrow: 1 }}>
      {/* <Prompt message='Are you sure you want to leave?' /> */}
      <Spin tip='Loadding...' spinning={isFetching} size='large'>
        <Row type='flex' justify='space-between'>
          <Col xs={24} md={12}>
            fg
          </Col>

          <Col xs={24} md={12}>
            <div style={{ overflow: 'hidden' }}>
              <Row gutter={20}>
                <Col span={14}>history</Col>
                <Col span={10}>
                  <Row gutter={20}>
                    <Col span={24}>
                      <Card title='Chat Box' size='small'>
                        <ChatBox />
                      </Card>
                    </Col>
                    <Col span={24} style={{ marginTop: 20 }}>
                      <Card title='Widget' size='small'>
                        <Button type='default' style={{ marginRight: 10 }}>
                          Undo
                        </Button>
                        <Button
                          type='primary'
                          style={{
                            backgroundColor: '#2ecc71',
                            marginRight: 10
                          }}
                        >
                          Tie
                        </Button>
                        <Button type='danger'>Surrender</Button>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default GameWithHuman;
