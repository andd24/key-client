import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const Key = () => (
  <>
    <Route render={() => {
      if (localStorage.getItem("key_token")) {
        return <>
          <Route>
            <NavBar />
            <ApplicationViews />
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