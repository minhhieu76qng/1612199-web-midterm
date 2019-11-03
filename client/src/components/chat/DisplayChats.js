import React from 'react';
import { List } from 'antd';
import uuidv1 from 'uuid/v1';

const DisplayChats = ({ messages }) => {
  return (
    <List
      itemLayout='vertical'
      style={{ maxHeight: 150, overflowY: 'auto' }}
      size='small'
    >
      {messages &&
        messages.map(item => {
          return (
            <List.Item key={uuidv1()}>
              <div>
                <strong>{item.name}</strong>: &nbsp;
                {item.msg}
              </div>
            </List.Item>
          );
        })}
    </List>
  );
};

export default DisplayChats;
