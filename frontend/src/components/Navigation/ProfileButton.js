import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory }from 'react-router-dom'
import CreateSpot from "../SpotDetails/createSpotForm";
import { useModal } from "../../context/Modal";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { closeModal } = useModal;

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const closeMenu = () => setShowMenu(false);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/');
  };


  const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");

  const demoLogin = () => {
    dispatch(sessionActions.login(
      {credential:'john', password:'password2'}
      ))
      .then(closeModal)
}
 
 


  const manageSpotButton = () => { 
    history.push('/user/current/spots')
  };

  const manageReviewButton = () => { 
    history.push('/user/current/reviews')
  }

  const manageBookingButton = () => { 
    history.push('/user/current/bookings')
  }

  return (
    <div className="navbar">
      <div className="create-spot-container">
        <button className="button-23" onClick={() => history.push('/create/spot')}>
          Hubnb your home
        </button>
        <button className='button-23' onClick={openMenu}>
          <i class="fa-solid fa-bars"></i>
          <i class="fa-regular fa-user"></i>
        </button>
      </div>
  
      <div className='user-menu-dropdown'>
        <ul className={`user-menu ${ulClassName}`} ref={ulRef}>
          {user ? (
            <div>
              <button className="button-23" onClick={manageSpotButton}>Manage Spot</button>
              <button className="button-23" onClick={manageBookingButton}>Manage Booking</button>
              <button className="button-23" onClick={logout}>Log Out</button>
            </div>
          ) : (
            <div className='user-drop-down-information'>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
  
}

export default ProfileButton;
