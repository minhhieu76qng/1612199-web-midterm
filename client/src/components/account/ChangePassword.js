import React from 'react';
import { Card, Form, Input, Button, Alert } from 'antd';
import './index.scss';

const ChangePassword = ({
  form,
  isFetching,
  changePassword,
  success,
  errors
}) => {
  const { getFieldDecorator } = form;

  const handleSubmit = event => {
    const { validateFields, getFieldValue } = form;
    event.preventDefault();
    validateFields(err => {
      if (!err) {
        // submit data
        const currentPw = getFieldValue('currentPw');
        const newPassword = getFieldValue('newPassword');
        const retype = getFieldValue('retype');

        changePassword({ currentPw, newPassword, retype });
      }
    });
  };

  return (
    <Card
      title='Change password'
      style={{
        maxWidth: 450,
        margin: '0 auto',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)'
      }}
    >
      {errors &&
        errors.map(err => (
          <Alert
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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onSubmit={event => handleSubmit(event)}
      >
        <Form.Item label='Current Password'>
          {getFieldDecorator('currentPw', {
            rules: [
              { required: true, message: 'Field is required!' },
              { min: 5, message: 'Password is at least 5 characters!' }
            ]
          })(<Input type='password' />)}
        </Form.Item>

        <Form.Item label='New Password'>
          {getFieldDecorator('newPassword', {
            rules: [
              { required: true, message: 'Field is required!' },
              { min: 5, message: 'Password is at least 5 characters!' }
            ]
          })(<Input type='password' />)}
        </Form.Item>
        <Form.Item label='Re-type'>
          {getFieldDecorator('retype', {
            rules: [
              { required: true, message: 'Field is required!' },
              {
                validator(rules, value, cb) {
                  const { getFieldValue } = form;
                  if (value && value !== getFieldValue('newPassword')) {
                    cb('Password is not match!');
                  }
                  cb();
                }
              }
            ]
          })(<Input type='password' />)}
        </Form.Item>

        <Form.Item
          wrapperCol={{ sm: { span: 12, offset: 6 } }}
          style={{ marginBottom: 0 }}
        >
          <Button
            loading={isFetching}
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

const WrappedChangePassword = Form.create({ name: 'form_changePassword' })(
  ChangePassword
);

export default WrappedChangePassword;
