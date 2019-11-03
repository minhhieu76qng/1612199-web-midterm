import React from 'react';
import { Divider } from 'antd';
import FormChatContainer from '../../containers/FormChatContainer';
import DisplayChatContainer from '../../containers/DisplayChatContainer';

const ChatBox = () => {
  return (
    <>
      <DisplayChatContainer />
      <Divider style={{ margin: '12px 0' }} />
      <FormChatContainer />
    </>
  );
};

export default ChatBox;
