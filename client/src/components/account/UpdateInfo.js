import React from 'react';
import { Card, Form, Input, Button, Select, Alert } from 'antd';
import shortId from 'shortid';
import './index.scss';

const UpdateInfo = ({ form, user, update, success, errors }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = event => {
    const { validateFields, getFieldValue } = form;
    event.preventDefault();
    validateFields(err => {
      if (!err) {
        // submit data
        const name = getFieldValue('name');
        const sex = getFieldValue('sex');
        const address = getFieldValue('address');

        update({ id: user.id, name, sex, address });
      }
    });
  };

  return (
    <Card
      loading={!user}
      title='Update account info'
      style={{
        maxWidth: 450,
        margin: '0 auto',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)'
      }}
    >
      {errors &&
        errors.map(err => (
          <Alert
            key={shortId.generate()}
            className='alert'
            type='error'
            message={err.code}
            description={err.message}
            showIcon
            closable
          />
        ))}
      {success && (
        <Alert
          className='alert'
          type='success'
          message='Success'
          description={success.message}
          showIcon
          closable
        />
      )}
      <Form
        className='form-account'
        layout='horizontal'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onSubmit={event => handleSubmit(event)}
      >
        <Form.Item label='Email'>
          {getFieldDecorator('email', {
            initialValue: user ? user.email : null
          })(<Input disabled />)}
        </Form.Item>

        <Form.Item label='Name' required hasFeedback>
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: 'Please input your name!' },
              {
                min: 3,
                message: 'Name must be at least 3 characters!'
              }
            ],
            initialValue: user ? user.name : null
          })(<Input />)}
        </Form.Item>

        <Form.Item label='Sex' required hasFeedback>
          {getFieldDecorator('sex', {
            initialValue: user ? user.sex.toString() : null
          })(
            <Select>
              <Select.Option key='true'>Male</Select.Option>
              <Select.Option key='false'>Female</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label='Address' required hasFeedback>
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please enter your address!' }],
            initialValue: user ? user.address : null
          })(<Input />)}
        </Form.Item>

        <Form.Item
          wrapperCol={{ sm: { span: 12, offset: 6 } }}
          style={{ marginBottom: 0 }}
        >
          <Button
            htmlType='submit'
            block
            type='primary'
            onClick={event => handleSubmit(event)}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const WrappedUpdateInfo = Form.create({ name: 'form_update' })(UpdateInfo);

export default WrappedUpdateInfo;
