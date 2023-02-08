import React from 'react';
import { NavLink, Link } from 'react-router-dom';


const Navbar = ({ toggleSidebar }) => (
  <nav className='navbar'>
    <ul className='navbar__list'>
      <Link className='navbar__logo' to='/'>
        Bailee and Alexander
      </Link>
      <li className='navbar__list__item'>
        <NavLink className='navbar__link' to='/'>
          Home
        </NavLink>
      </li>
      <li className='navbar__list__item'>
        <NavLink className='navbar__link' to='/rsvp'>
          RSVP
        </NavLink>
      </li>
      <li className='navbar__list__item'>
        <NavLink className='navbar__link' to='/travel'>
          Travel
        </NavLink>
      </li>
      <li className='navbar__list__item'>
        <NavLink className='navbar__link' to='/schedule'>
          Schedule
        </NavLink>
      </li>
      <li className='navbar__list__item'>
        <NavLink className='navbar__link' to='/qna'>
          Q & A
        </NavLink>
      </li>
      <li className='navbar__list__item'>
        <NavLink className='navbar__link' to='/weddingparty'>
          Wedding Party
        </NavLink>
      </li>
      <li className='navbar__list__item'>
        <NavLink className='navbar__link' to='/registry'>
          Registry
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;