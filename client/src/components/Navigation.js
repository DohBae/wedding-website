// Manages navbar and sidebar
import React, { Fragment, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Navigation = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Fragment>
      <Navbar toggleSidebar={toggleSidebar}/>
      <Sidebar isOpen={showSidebar} closeSidebar={closeSidebar}/>
    </Fragment>
  );
};

export default Navigation;
