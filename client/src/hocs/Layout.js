import React, { Fragment } from 'react';
import Navigation from '../components/Navigation';

const Layout = ({ children }) => (
  <Fragment>
    <Navigation />
    <div className='container' style={{ marginTop: '50px' }}>
      {children}
    </div>
  </Fragment>
);

export default Layout;