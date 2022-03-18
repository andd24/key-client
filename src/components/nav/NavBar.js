import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { getCurrentUser } from "../users/UserManager"

export const NavBar = () => {
  const history = useHistory()
  const navbar = useRef()
  const hamburger = useRef()
  const [currentUser, setCurrentUser] = useState({})


  useEffect(() => {
    if(localStorage.getItem('key_token')){
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
                <Link to="/projects" className="navbar-item has-text-weight-semibold">Projects</Link>
                <Link to="/browse" className="navbar-item has-text-weight-semibold">Browse</Link>
                <Link to="/org" className="navbar-item has-text-weight-semibold">Organization</Link>
              </>
              :
              ""
          }

        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                localStorage.getItem('key_token')
                  ?
                  <button className="button is-outlined" onClick={() => {
                    localStorage.removeItem('key_token')
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