import React from 'react';
import { List, Button, Card } from 'antd';

const History = ({ history, jumpTo, toggleSort, selected, sort }) => {
  const renderMoves = () => {
    if (!history) return <></>;

    // default : sort = true

    // clone to new history
    let his = [...history];
    his = his.sort((p1, p2) => {
      const comp = p1.id <= p2.id;
      return comp === sort ? -1 : 1;
    });

    return his.map(step => {
      const { lastPosition, id } = step;
      const desc = id
        ? `Move to #${id}. Position [${lastPosition.x},${lastPosition.y}]`
        : 'Go to game start';

      const isSelect = id === selected;
      return (
        <List.Item key={id}>
          <Button
            type={isSelect ? 'primary' : 'default'}
            block
            onClick={() => jumpTo(id)}
          >
            {desc}
          </Button>
        </List.Item>
      );
    });
  };

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
        {renderMoves()}
      </List>
    </Card>
  );
};

export default History;
