import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { getCurrentUser } from '../users/UserManager';
import './Sidebar.css';


export default props => {
    const [currentUser, setCurrentUser] = useState({})


    useEffect(() => {
      if(localStorage.getItem('key_token')){
        getCurrentUser().then(setCurrentUser)
      }
    }, [])
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/projects">
        Projects
      </a>
      <a className="menu-item" href="/browse">
        Browse
      </a>
      <a className="menu-item" href={`/profile/${currentUser.id}`}>
        Profile
      </a>
    </Menu>
  );
};