import React, { useContext, useState } from 'react';
import './profile.css';
import { RoleContext } from '../Header';
import { NameContext } from '../Header';

const Profile = ({active, setActive, logout}) => {

  const role = useContext(RoleContext);
  const name = useContext(NameContext);

  function logoutFunc() {
    window.location.reload()
    logout();
    setActive(false);
  }

  return (
    <div className={active ? 'profile active' : 'profile'}>
      <div className="profile__content">
      </div>
    </div>
  )
}

export default Profile;