import React, { Fragment } from 'react';
import Navigation from '../components/Navigation';

const Layout = ({ children }) => (
  <Fragment>
    <Navigation />
    <div>
      {children}
    </div>
  </Fragment>
);

export default Layout;