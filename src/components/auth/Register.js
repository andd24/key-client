import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getFields } from "../fields/FieldManager"
import { getInstitutions } from "../institutions/InstitutionManager"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        // if (string === null && !url.current.value ) {
        //     imageDialog.current.showModal()
        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "email": email.current.value,
                "last_name": lastName.current.value,
                "password": password.current.value,
                // "field": field,
                // "institution": institution
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("key_token", res.token)
                        history.push("/projects")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }



    return (
        <main className="columns container pl-2 is-centered">

            <dialog ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <form className="column mt-6 is-two-thirds" onSubmit={handleRegister}>
                <h1 className="title">Register an account</h1>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="firstName"> First Name </label>
                    <div className="control">
                        <input className="input" ref={firstName} type="text" name="firstName" placeholder="First name" required autoFocus />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="lastName"> Last Name </label>
                    <div className="control">
                        <input className="input" ref={lastName} type="text" name="lastName" placeholder="Last name" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="email">Email</label>
                    <div className="control">
                        <input className="input" ref={email} type="text" name="email" placeholder="Email" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="inputUsername">Username</label>
                    <div className="control">
                        <input className="input" ref={username} type="text" name="username" placeholder="Username" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="inputPassword"> Password </label>
                    <div className="control">
                        <input className="input" ref={password} type="password" name="password" placeholder="Password" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="verifyPassword"> Verify Password </label>
                    <div className="control">
                        <input className="input" ref={verifyPassword} type="password" name="verifyPassword" placeholder="Verify password" required />
                    </div>
                </fieldset>
                <fieldset className="field mb-5">
                    <button className="button is-link" type="submit">Register</button>
                </fieldset>
                <section className="mt-5 pb-5">
                    Already registered? <Link to="/login">Login</Link>
                </section>
            </form>
        </main>
    )
}