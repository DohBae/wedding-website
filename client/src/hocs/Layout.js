import React, { Fragment } from 'react';
import Navigation from '../components/Navigation';

const PgLayout = ({ children }) => (
      <Fragment>
        <Navigation />
        <div className='container'>
          {children}
        </div>
      </Fragment>

);

export default PgLayout;