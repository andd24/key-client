import React, { useState, useEffect } from "react"
import { getFields } from "../fields/FieldManager"
import { getUsers } from "../users/UserManager"
import { getCompletedProjectsByUser, getPublishedProjects, getPublishedProjectsByField, getPublishedProjectsByTitle } from "./ProjectManager"


export const ProjectFilters = ({ setProjects }) => {
    const [fields, setFields] = useState([])
    const [users, setUsers] = useState([])
    const [userChoices, setUserChoices] = useState({
        fieldId: "0",
        userId: "0",
        searchTerms: ""
    })

    useEffect(() => {
        getFields().then(f => setFields(f))
        getUsers().then(u => setUsers(u))
    }, [])

    useEffect(() => {
        if (userChoices.fieldId === "0" & userChoices.userId === "0" & userChoices.searchTerms === "") {
            //AND all other filters are also "0" (once written)
            getPublishedProjects().then(p => setProjects(p))
        } else if (userChoices.fieldId !== "0") {
            getPublishedProjectsByField(userChoices.fieldId)
                .then(setProjects)
        } else if (userChoices.userId !== "0") {
            getCompletedProjectsByUser(userChoices.userId)
                .then(setProjects)
        } else if (userChoices.searchTerms !== "") {
            getPublishedProjectsByTitle(userChoices.searchTerms)
                .then(setProjects)
        } 
    }, [userChoices])

    return (
        <>
            <div className="panel m-5">
            <p className="panel-heading"></p>
            <div className="panel-block">
                        <input className="input" type="text"
                            placeholder="Search by Title..."
                            name="search"
                            onKeyUp={
                                (event) => {
                                    const copy = Object.assign({}, userChoices)
                                    copy.fieldId = "0"
                                    copy.userId = "0"
                                    copy.searchTerms = event.target.value
                                    setUserChoices(copy)
                                }
                            } />
                    </div>
                </div>
                <form className="form m-5 level">
                <div className="control m-3 level-item">
                    
                    <label htmlFor="category"> Filter by field: </label>
                    <div className="select ml-2">
                    <select name="category"
                        value={userChoices.fieldId}
                        onChange={(event) => {
                            const copy = Object.assign({}, userChoices)
                            copy.fieldId = event.target.value
                            copy.userId = "0"
                            copy.searchTerms = ""
                            setUserChoices(copy)
                            //add logic to set other userChoices back to "0" once those are written
                        }}>

                        <option value="0">All</option>
                        {fields.map(field => (
                            <option key={field.id} value={field.id}>
                                {field.label}
                            </option>
                        ))}
                    </select>
                    </div>
                </div>
            
         
                <div className="control m-3 level-item">
                    
                    <label htmlFor="author"> Filter by user: </label>
                    <div className="select ml-2">
                    <select name="author"
                        value={userChoices.userId}
                        onChange={(event) => {
                            const copy = Object.assign({}, userChoices)
                            copy.fieldId = "0"
                            copy.userId = event.target.value
                            copy.searchTerms = ""
                            setUserChoices(copy)
                            //add logic to set other userChoices back to "0" once those are written
                        }}>

                        <option value="0">All</option>
                        {users.map(user => (
                            <option key={user.user?.id} value={user.user?.id}>
                                {user.user?.first_name} {user.user?.last_name}
                            </option>
                        ))}
                    </select>
                    </div> 
                </div>
            </form>
            
        </>
    )
}