import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCompletedProjectsByUser, getProjects, getProjectsByUser } from "./ProjectManager"
import { getCurrentUser } from "../users/UserManager"
import Project from "./ProjectDetails"

export const ProjectDashboard = () => {
    const [user, setUser] = useState({})
    const [projects, setProjects] = useState([])
    const [completed, setCompleted] = useState([])

    useEffect(() => {
        getCurrentUser().then(setUser)
    }, [])

    //first fetch fails, second one succeeds
    //user object not being returned fast enough
    useEffect(() => {
        getProjectsByUser(user.user?.id).then(p => setProjects(p))
        getCompletedProjectsByUser(user.user?.id).then(setCompleted)
    }, [user])

    return (
        <>
        <h1>Project Dashboard</h1>
        <Link to="/projects/new"><button>Start a new project</button></Link>
        <h2>In progress</h2>
        {projects.map((project) => {
            if (project.public != true) {
                return (
                    <div><Link to={`/projects/${project.id}`}>{project.title}</Link></div>
                )
            }
        }
        )}
        <h2>Complete</h2>
        {completed.map((completed) => {
            return (
                <div><Link to={`/projects/${completed.id}`}>{completed.title}</Link></div> 
            )
        })}
        </>
    )
}