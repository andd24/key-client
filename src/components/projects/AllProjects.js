import React, { useState, useEffect } from "react"
import { getProjects, getProjectsByUser, getPublishedProjects } from "./ProjectManager"
import { getCurrentUser } from "../users/UserManager"
import Project from "./ProjectDetails"

export const AllProjects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getPublishedProjects().then(p => setProjects(p))
    }, [])

    return (
        <>
        <h1>Browse Published Projects</h1>
        {projects.map((project) => {
            return (
                    <div>{project.title}</div>
                )
            }
        )}
        </>
    )
}