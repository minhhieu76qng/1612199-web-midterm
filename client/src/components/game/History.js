import React from 'react';
import { List, Button, Card } from 'antd';
import uuidv1 from 'uuid/v1';

const History = ({ history, jumpTo, toggleSort, selected, sort }) => {
  if (!history) return <></>;

  // clone to new history
  const his = [...history];

  const moves = his.map((step, idx) => {
    const { lastPosition } = step;
    const desc = idx
      ? `Move to #${idx}. Position [${lastPosition.x},${lastPosition.y}]`
      : 'Go to game start';

    const isSelect = idx === selected;
    return (
      <List.Item key={uuidv1()}>
        <Button
          type={isSelect ? 'primary' : 'default'}
          block
          onClick={() => jumpTo(idx)}
        >
          {desc}
        </Button>
      </List.Item>
    );
  });

  if (!sort) {
    moves.reverse();
  }

  const sortIcon = sort ? 'down' : 'up';

  return (
    <Card
      size='small'
      title='History'
      className='game-card history-block'
      extra={
        <Button
          size='small'
          type='primary'
          shape='circle'
          icon={sortIcon}
          onClick={toggleSort}
        />
      }
    >
      <List
        style={{ maxHeight: '300px', overflowX: 'auto' }}
        size='small'
        split={false}
      >
        {moves}
      </List>
    </Card>
  );
};

export default History;
