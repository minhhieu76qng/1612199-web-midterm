import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Spin, Modal } from 'antd';
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

  const [winner, setWinner] = useState(null);
  const [winnerText, setWinnerText] = useState(null);

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

    s.on('show_result', (winnerID, winnerChar) => {
      if (winnerID !== null) {
        setWinner(winnerChar);
        setWinnerText('Winner');
      } else {
        setWinner('XO');
        setWinnerText('Draw');
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      s.off('receive_game_data');
      s.off('show_result');
      clearMatch();
    };
  }, []);

  if (!roomID) {
    return <Redirect to='/game' />;
  }

  const surrender = () => {
    s.emit('surrender', roomID);
  };

  const handleBtnResult = () => {
    clearMatch();
  };

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
                        <Button type='danger' onClick={surrender}>
                          Surrender
                        </Button>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Spin>

      <Modal
        title='Result'
        visible={winner !== null}
        onOk={handleBtnResult}
        okText='Leave game'
        cancelButtonProps={{
          disabled: true
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 20, fontSize: 25, fontWeight: 700 }}>
            {winnerText}
          </p>
          <p
            style={{
              fontWeight: 900,
              fontSize: 100,
              marginBottom: 0,
              lineHeight: 1
            }}
            className={`player ${winner}`}
          >
            {winner}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default GameWithHuman;
