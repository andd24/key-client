import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getProjects, getProjectsByUser, getPublishedProjects } from "./ProjectManager"
import { getCurrentUser } from "../users/UserManager"
import { Project } from "./Project"
import { ProjectFilters } from "./ProjectFilters"

export const AllProjects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getPublishedProjects().then(p => setProjects(p))
    }, [])

    return (
        <>
        <div className="container m-6 p-6 has-background-link-light">
            <div className="title is-2 ">Browse Published Projects</div>
            <ProjectFilters setProjects={setProjects} />
            {projects.map((project) => {
                    return  <Link to={`/projects/${project.id}/full`}><Project project={project} /></Link>
            })
            }
        </div>
        </>
    )
}