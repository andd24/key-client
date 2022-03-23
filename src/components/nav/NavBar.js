import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"
import { getCurrentUser } from "../users/UserManager"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  const navbar = useRef()
  const [currentUser, setCurrentUser] = useState({})


  useEffect(() => {
    if(localStorage.getItem('key_token')){
      getCurrentUser().then(setCurrentUser)
    }
  }, [])

  return (

      <div className="navbar" ref={navbar}>
        {/* <img src="/Untitled design.png" /> */}
        <div className="title">Key</div>
          {
            localStorage.getItem('key_token')
              ?
              <>
              <li className="navbar__item active">
                <Link to="/projects" className="navbar__link">Projects</Link>
              </li>
              <li className="navbar__item active">
                <Link to="/browse" className="navbar__link">Browse</Link>
              </li>
              <li className="navbar__item active">
                <Link to={`/profile/${currentUser.id}`} className="navbar__link">Profile</Link>
              </li>
              <div className="navbar__item">
              <button className="button is-outline" onClick={() => {
                    localStorage.removeItem('key_token')
                    history.push('/login')
                  }}>Logout {currentUser.user?.username}</button>
              </div>
              {/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> */}
              </>
              :
              ""
          }    
      </div>
   
  )
}