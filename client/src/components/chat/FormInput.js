import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import socketio from '../../socketio';
import LocalStorage from '../../utils/LocalStorage';

const FormInput = ({ form, addMessage, roomID }) => {
  const socket = socketio;

  const {
    getFieldDecorator,
    getFieldValue,
    validateFields,
    resetFields
  } = form;

  const handleSubmit = event => {
    event.preventDefault();

    const user = LocalStorage.getUser();
    if (!user) {
      return;
    }
    validateFields(err => {
      if (!err) {
        const msg = getFieldValue('message');
        socket.emit('new_message', {
          roomID,
          userID: user.id,
          name: user.name,
          msg
        });

        // xoa message tronng input
        resetFields(['message']);
      }
    });
  };

  useEffect(() => {
    socket.on('has_message', data => {
      addMessage(data.userID, data.name, data.msg);
    });
  }, []);

  useEffect(() => {
    return () => {
      socket.off('has_message');
    };
  }, []);

  return (
    <Form
      layout='horizontal'
      style={{ display: 'flex' }}
      onSubmit={handleSubmit}
      autoComplete='off'
    >
      <Form.Item style={{ marginBottom: 0, flexGrow: 1, marginRight: 20 }}>
        {getFieldDecorator('message', {
          initialValue: '',
          rules: [
            {
              required: true,
              message: 'Content is empty!'
            }
          ]
        })(<Input placeholder='Your message...' />)}
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button type='primary' onClick={handleSubmit}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedFormInput = Form.create('form_chat')(FormInput);

export default WrappedFormInput;
