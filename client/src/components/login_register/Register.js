import React from 'react';
import {
  Form,
  Input,
  Card,
  Row,
  Col,
  Icon,
  Typography,
  Button,
  Spin,
  Alert,
  Select
} from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';

const RegisterForm = ({ form, isFetching, register, success, errors }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = event => {
    const { validateFields, getFieldValue } = form;
    event.preventDefault();
    validateFields(err => {
      if (!err) {
        // submit data
        const email = getFieldValue('email');
        const name = getFieldValue('name');
        const password = getFieldValue('password');
        const retype = getFieldValue('retype');
        const sex = getFieldValue('sex');

        register({ email, name, password, retype, sex });
      }
    });
  };

  return (
    <div className='wrapped_form' style={{ minHeight: window.innerHeight }}>
      <Row type='flex' justify='center'>
        <Col xs={24} md={12} lg={6} style={{ marginTop: '50px' }}>
          <Spin spinning={isFetching}>
            <Card className='form_card'>
              <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Register
              </Typography.Title>

              {success && (
                <Alert
                  className='alert_form'
                  message='Success'
                  description={success.message}
                  type='success'
                  closable
                />
              )}
              {errors &&
                errors.map(e => (
                  <Alert
                    className='alert_form'
                    message='Error'
                    description={e.message}
                    type='error'
                    closable
                  />
                ))}

              <Form
                className='auth_form'
                layout='vertical'
                onSubmit={event => handleSubmit(event)}
              >
                <Form.Item required hasFeedback>
                  {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: 'Please input your name!' },
                      {
                        min: 3,
                        message: 'Name must be at least 3 characters!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type='user'
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type='text'
                      placeholder='Fullname'
                    />
                  )}
                </Form.Item>
                <Form.Item required hasFeedback>
                  {getFieldDecorator('email', {
                    rules: [
                      { required: true, message: 'Please input your email!' },
                      {
                        // eslint-disable-next-line
                        pattern: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                        message: 'Email not valid!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type='mail'
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type='text'
                      placeholder='Email'
                    />
                  )}
                </Form.Item>

                <Form.Item required hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!'
                      },
                      {
                        min: 5,
                        message: 'Password must be at least 5 characters!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type='lock'
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type='password'
                      placeholder='Password'
                    />
                  )}
                </Form.Item>

                <Form.Item required hasFeedback>
                  {getFieldDecorator('retype', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your retype password!'
                      },
                      {
                        validator: (rule, value, callback) => {
                          const { getFieldValue } = form;
                          if (value && value !== getFieldValue('password')) {
                            callback('Re-type password is not matched!');
                          }
                          callback();
                        }
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type='lock'
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type='password'
                      placeholder='Re-type password'
                    />
                  )}
                </Form.Item>

                <Form.Item required hasFeedback>
                  {getFieldDecorator('sex', {
                    initialValue: 'true',
                    rules: [
                      {
                        required: true,
                        message: 'Please choose your sex!'
                      }
                    ]
                  })(
                    <Select>
                      <Select.Option value='true'>Male</Select.Option>
                      <Select.Option value='false'>Female</Select.Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item style={{ marginBottom: '0px' }}>
                  <Button
                    block
                    type='primary'
                    size='large'
                    htmlType='submit'
                    onClick={event => handleSubmit(event)}
                  >
                    Sign up
                  </Button>
                  <div
                    style={{
                      marginTop: '20px',
                      display: 'block',
                      textAlign: 'right'
                    }}
                  >
                    Already have account? &nbsp;
                    <Link to='/login'>Sign in</Link>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

const WrappedRegisterForm = Form.create({ name: 'form_register' })(
  RegisterForm
);

export default WrappedRegisterForm;
