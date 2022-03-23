import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import Sidebar from "./sidebar/Sidebar"

export const Key = () => (
  <>
    <Route render={() => {
      if (localStorage.getItem("key_token")) {
        return <>
          <Route>
         
            <div className="outer-container">
              <NavBar />
            
              <div className="page-wrap">
            <ApplicationViews />
            
            </div>
            </div>
          </Route>
        </>
      } else {
        return <Redirect to="/login" />
      }
    }} />

    <Route path="/login">
      <NavBar />
      <Login />
    </Route>

    <Route path="/register">
      <NavBar />
      <Register />
    </Route>

  </>
)