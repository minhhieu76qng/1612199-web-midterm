import React from 'react';
import { Layout } from 'antd';
import NavBarContainer from '../containers/NavBarContainer';

const { Header } = Layout;

const LayoutPage = ({ children }) => {
  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className='logo' />
        <NavBarContainer />
      </Header>
      <Layout style={{ position: 'relative', marginTop: 64 }}>
        {children}
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
