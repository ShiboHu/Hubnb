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
  };


  const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");

  const demoLogin = () => {
    dispatch(sessionActions.login(
      {credential:'john', password:'password2'}
      ))
      .then(closeModal)
}
 
 
   const createSpotButton = () => { 
    if(!user){ 
      return null
    }else { 
      return <div>
        <OpenModalButton
        buttonText="Create A Spot"
        onButtonClick={closeMenu}
        modalComponent={<CreateSpot />}
      />
      </div>
    }
  };

  const manageSpotButton = () => { 
    history.push('/user/current/spots')
  };

  return (
    <div className="navbar">
      <div className="create-spot-container ">
      {createSpotButton()}
      </div>
      <div className="class-hover">
      <button onClick={openMenu} className="menu-icon">
      <i class="fa-solid fa-bars"></i>
      <i class="fa-solid fa-circle-user"></i>
      </button>
      </div>
      <div className='user-menu-dropdown'>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={manageSpotButton}>Manage Spot</button>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <div>
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            <button onClick={demoLogin} onButtonClick={closeMenu}>Demo Login</button>
            </li>
            <li>
            </li>
          </div>
        )}
      </ul>
      </div>
    </div>
  );
}

export default ProfileButton;
