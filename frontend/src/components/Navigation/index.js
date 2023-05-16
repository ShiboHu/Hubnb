import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import hubnbLogo from './hubnblogo.png'
import './Navigation.css';
import LandingPage from '../LandingPage';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  
  return (
    <div className='page'>
     <ul className='navigation-bar'>
      <li>
        <NavLink exact to="/"><img src={hubnbLogo} className='logo' alt='hubnb'/></NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </div>
 
  );
}

export default Navigation;
