import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getProjects, getProjectsByUser } from "./ProjectManager"
import { getCurrentUser } from "../users/UserManager"
import Project from "./ProjectDetails"

export const ProjectDashboard = () => {
    const [projects, setProjects] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        getCurrentUser().then(u => setUser(u))
        getProjects().then(p => setProjects(p))
        
    }, [])

    return (
        <>
        <h1>Project Dashboard</h1>
        <Link to="/projects/new"><button>Start a new project</button></Link>
        <h2>In progress</h2>
        {projects.map((project) => {
            if (user.user?.id === project.user?.id) {
                return (
                    <div><Link to={`/projects/${project.id}`}>{project.title}</Link></div>
                )
            }}
        )}
        <h2>Complete</h2>
        </>
    )
}