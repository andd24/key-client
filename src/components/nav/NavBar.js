import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { getCurrentUser } from "../users/UserManager"

export const NavBar = () => {
  const history = useHistory()
  const navbar = useRef()
  const hamburger = useRef()
  const [currentUser, setCurrentUser] = useState({})


  useEffect(() => {
    if(localStorage.getItem('rare_token')){
      getCurrentUser().then(setCurrentUser)
    }
  }, [])

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  return (
    <nav className="navbar is-success mb-3 py-2" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src="public/favicon.ico" height="3rem" /> <h1 className="title is-4 ml-2">Key</h1>
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {
            localStorage.getItem('key_token')
              ?
              <>
                <Link to="/posts" className="navbar-item has-text-weight-semibold">Posts</Link>
                <Link to="/my-posts" className="navbar-item has-text-weight-semibold">My Posts</Link>
                <Link to="/newpost" className="navbar-item has-text-weight-semibold">New Post</Link>
                {
                  currentUser.user?.is_staff ? <Link to="/tags" className="navbar-item has-text-weight-semibold">Tag Management</Link> : ""
                }
                {
                  currentUser.user?.is_staff ? <Link to="/categories" className="navbar-item has-text-weight-semibold">Category Management</Link> : ""
                }
                {
                  currentUser.user?.is_staff ? <Link to="/reactions" className="navbar-item has-text-weight-semibold">Reaction Management</Link> : ""
                }                        
                {
                  currentUser.user?.is_staff ? <Link to="/users" className="navbar-item has-text-weight-semibold">User List</Link> : ""
                }
              </>
              :
              ""
          }

        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                localStorage.getItem('rare_token')
                  ?
                  <button className="button is-outlined" onClick={() => {
                    localStorage.removeItem('rare_token')
                    history.push('/login')
                  }}>Logout {currentUser.user?.username}</button>
                  :
                  <>
                    <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}