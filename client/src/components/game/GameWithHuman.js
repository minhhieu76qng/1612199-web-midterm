import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Prompt } from 'react-router-dom';
import ChatBox from '../chat/Chat';

const GameWithHuman = ({ clearMatch }) => {
  document.title = 'Play with human';

  clearMatch();
  return (
    <div className='game-wrapper' style={{ flexGrow: 1 }}>
      <Prompt message='Are you sure you want to leave?' />
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
                        style={{ backgroundColor: '#2ecc71', marginRight: 10 }}
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
    </div>
  );
};

export default GameWithHuman;
