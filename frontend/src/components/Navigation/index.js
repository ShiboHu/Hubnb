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

<div className='personalsite' target="_blank">
      <a href='https://www.linkedin.com/in/shibo-hu-b4712323a/'>
      <i class="fa-brands fa-linkedin">
        LinkedIn
        </i>
      </a>

      <a href='https://github.com/ShiboHu' target="_blank">
      <i class="fa-brands fa-github">
        GitHub
        </i>
      </a>

      <a href='https://shibohu.github.io/portfolio/' target="_blank">
      <i class="fa-solid fa-user-tag">
        Portfolio
        </i>
      </a>
</div>

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
