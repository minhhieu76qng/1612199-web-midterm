import React, { useEffect } from 'react';
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
  Alert
} from 'antd';
import { Link, Redirect } from 'react-router-dom';
import './index.scss';

const Login = ({
  form,
  isFetching,
  login,
  errors,
  user,
  loginWithGg,
  loginWithFb,
  saveUserFromToken
}) => {
  const { getFieldDecorator } = form;

  const handleSubmit = event => {
    const { validateFields, getFieldValue } = form;
    event.preventDefault();
    validateFields(err => {
      if (!err) {
        // submit data
        const email = getFieldValue('email');
        const password = getFieldValue('password');

        login({ email, password });
      }
    });
  };

  useEffect(() => {
    // token -> user
    saveUserFromToken();
  }, []);

  if (user) {
    return <Redirect to={{ pathname: '/' }} />;
  }
  return (
    <div className='wrapped_form' style={{ minHeight: window.innerHeight }}>
      <Row type='flex' justify='center'>
        <Col xs={24} md={12} lg={6} style={{ marginTop: '50px' }}>
          <Spin spinning={isFetching}>
            <Card className='form_card'>
              <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Login
              </Typography.Title>

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
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your email!'
                      },
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
                        min: 6,
                        message: 'Password must be at least 6 characters!'
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

                <Form.Item style={{ marginBottom: '0px' }}>
                  <Button
                    block
                    type='primary'
                    size='large'
                    htmlType='submit'
                    onClick={event => handleSubmit(event)}
                  >
                    Log in
                  </Button>
                  <div
                    style={{
                      marginTop: '20px',
                      display: 'block'
                    }}
                  >
                    Or login with
                    <Row gutter={10}>
                      <Col span={12}>
                        <Button
                          style={{ marginTop: '10px' }}
                          block
                          type='primary'
                          size='large'
                          onClick={loginWithFb}
                        >
                          Login with <Icon type='facebook' theme='filled' />
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button
                          style={{ marginTop: '10px' }}
                          block
                          type='danger'
                          size='large'
                          onClick={loginWithGg}
                        >
                          Login with{' '}
                          <Icon type='google-circle' theme='filled' />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <div
                    style={{
                      marginTop: '20px',
                      display: 'block',
                      textAlign: 'right'
                    }}
                  >
                    New with our? &nbsp;
                    <Link to='/register'>Sign up now</Link>
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

const WrappedLogin = Form.create({ name: 'form_login' })(Login);

export default WrappedLogin;
