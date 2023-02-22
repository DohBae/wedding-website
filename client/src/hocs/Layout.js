import React, { Fragment } from 'react';
import { Layout } from 'antd';
import Navigation from '../components/Navigation';
const { Header } = Layout;

const PgLayout = ({ children }) => (
  <Layout>
    <Header>
      <Fragment>
        <Navigation />
        <div className='container'>
          {children}
        </div>
      </Fragment>
    </Header>

  </Layout>
);

export default PgLayout;