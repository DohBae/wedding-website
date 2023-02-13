import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({
  isOpen,
  closeSidebar
}) => {
  const styles = isOpen ? 'sidebar side--open' : 'sidebar sidebar--closed';

  return (
    <Fragment>
      {isOpen ? <div className='sidebar__backdrop' onClick={closeSidebar}></div> : <Fragment></Fragment>}
      <nav className={`${styles}`}>
        <ul className='sidebar__list'>
          <div className='sidebar__logo'>
            Bailee & Alex
          </div>
          <li className='sidebar__list__item' onClick={closeSidebar}>
            <NavLink className='sidebar__link' exact to='/'>
              Home
            </NavLink>
          </li>
          <li className='sidebar__list__item' onClick={closeSidebar}>
            <NavLink className='sidebar__link' exact to='/rsvp'>
              RSVP
            </NavLink>
          </li>
          <li className='sidebar__list__item' onClick={closeSidebar}>
            <NavLink className='sidebar__link' exact to='/travel'>
              Travel
            </NavLink>
          </li>
          <li className='sidebar__list__item' onClick={closeSidebar}>
            <NavLink className='sidebar__link' exact to='/schedule'>
              Schedule
            </NavLink>
          </li>
          <li className='sidebar__list__item' onClick={closeSidebar}>
            <NavLink className='sidebar__link' exact to='/qna'>
              Q & A
            </NavLink>
          </li>
          <li className='sidebar__list__item' onClick={closeSidebar}>
            <NavLink className='sidebar__link' exact to='/weddingparty'>
              Wedding Party
            </NavLink>
          </li>
          <li className='sidebar__list__item' onClick={closeSidebar}>
            <NavLink className='sidebar__link' exact to='/registry'>
              Registry
            </NavLink>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Sidebar;