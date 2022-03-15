import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const bio = useRef()
    const url = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const imageDialog = useRef()
    const history = useHistory()
    const [string, setString] = useState(null)

    // const getBase64 = (file, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(file);
    // }

    // const createImageString = (event) => {
    //     getBase64(event.target.files[0], (base64ImageString) => {
    //         console.log("Base64 of file is", base64ImageString);
    //         // Update a component state variable to the value of base64ImageString
    //         setString(base64ImageString)
    //     });
    // }

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
                "bio": bio.current.value,
                "profile_image_url": url.current.value,
                "profile_pic": string,
                "password": password.current.value
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
                        localStorage.setItem("rare_token", res.token)
                        history.push("/")
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
                <button className="delete" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <dialog className="dialog dialog--image" ref={imageDialog}>
                <div>Please upload a profile picture OR provide an image URL</div>
                <button className="button--close" onClick={e => imageDialog.current.close()}>Close</button>
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
                    <label className="label" htmlFor="bio"> Add a bio </label>
                    <div className="control">
                        <textarea ref={bio} name="bio" className="textarea" placeholder="Let other gamers know a little bit about you..." />
                    </div>
                </fieldset>
                {/* <fieldset className="field mb-5">
                    <input className="input" type="file" onChange={createImageString} />
                    <input className="file-input" type="hidden" name="id" value={string} />
                </fieldset>
                OR
                <fieldset className="field mb-5">
                    <label className="label" htmlFor="image"> Add an image URL </label>
                    <div className="control">
                        <textarea className="textarea" rows='2' ref={url} name="url" placeholder="Add a profile picture" />
                    </div>
                </fieldset> */}
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