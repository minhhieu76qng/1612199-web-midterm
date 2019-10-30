import React from 'react';
import NavBarContainer from '../containers/NavBarContainer';

const Layout = ({ children }) => {
  return (
    <>
      <NavBarContainer />
      <div className='content-page'>{children}</div>
    </>
  );
};

export default Layout;
